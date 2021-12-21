import React, { useEffect, useMemo } from 'react';

import { Subject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// ======= CORE ====== //
export interface State {
  name: string;
  streamMaps: {
    valueSourceMap: Map<string, Subject<any>>;
    instantValueSourceMap: Map<string, Subject<any>>;
    changeSourceMap: Map<string, Subject<any>>;
    blurSourceMap: Map<string, Subject<any>>;
    setValueMap: Map<string, (...args: any[]) => any>;
    blurValueMap: Map<string, Subject<any>>;
  };
  state: Record<string, any>;
}

const DEFAULT_NAMESPACE = '';

interface FieldConfig {
  name: string;
  namespace?: string;
}

export type Field = FieldConfig | string;

export function getFieldConfig(field: Field): FieldConfig {
  if (typeof field === 'string') {
    return {
      name: field,
    };
  }

  return field;
}

export function getFieldId(field: Field) {
  const config = getFieldConfig(field);
  return config.name || '';
}

export type FieldId = ReturnType<typeof getFieldId>;

const contexts = new Map<string, State>();

/** create Subject in map */
function createSource<T>(map: Map<string, Subject<T>>, name: string) {
  const source = new Subject<T>();
  map.set(name, source);
  return source;
}

/** create a new State Context */
function createState(name: string): State {
  const valueSourceMap = new Map();
  const instantValueSourceMap = new Map();
  const blurSourceMap = new Map();
  const setValueMap = new Map();
  const blurValueMap = new Map();
  const changeSourceMap = new Map();

  return {
    name,
    streamMaps: {
      valueSourceMap,
      instantValueSourceMap,
      changeSourceMap,
      blurSourceMap,
      setValueMap,
      blurValueMap,
    },
    state: {},
  };
}

/** create a new State, and then save to contexts */
function createContext(name: string) {
  const state = createState(name);
  contexts.set(name, state);
  return state;
}

/** get target Subject, if nothing, will create one */
function getSource<T>(map: Map<FieldId, Subject<T>>, fieldId: FieldId) {
  return map.get(fieldId) || createSource<T>(map, fieldId);
}

/** get current namespace state */
function getContext(namespace: FieldConfig['namespace'] = DEFAULT_NAMESPACE) {
  return contexts.get(namespace) || createContext(namespace);
}

/** get target map */
function getMapFromType<T extends keyof State['streamMaps']>(
  type: T,
  field: Field
) {
  const fieldConfig = getFieldConfig(field);
  const currentContext = getContext(fieldConfig.namespace);
  return currentContext.streamMaps[type] as State['streamMaps'][T];
}

/** set field value */
function setSourceFieldFromType<T extends keyof State['streamMaps']>(
  type: T,
  field: Field,
  value: any
) {
  const map = getMapFromType(type, field);
  const fieldId = getFieldId(field);
  map.set(fieldId, value);
}

/** get target Subject, if nothing, will return undefined */
function getSourceFieldFromType<T extends keyof State['streamMaps']>(
  type: T,
  field: Field
) {
  const fieldId = getFieldId(field);
  const map = getMapFromType(type, field);
  const value = map.get(fieldId) as ReturnType<State['streamMaps'][T]['get']>;
  return value;
}

/** get/create a Subject in map */
function getStream<T>(type: keyof State['streamMaps'], field: Field) {
  const map = getMapFromType(type, field);
  return getSource<T>(map as any, getFieldId(field));
}

/** set setValue method to map */
function registerSetValueMethod(field: Field, setValueMethod: any) {
  setSourceFieldFromType('setValueMap', field, setValueMethod);
}

// ===== CORE END ===== //

// ===== API ===== //
/** the value stream */
export function getValueSource<T>(field: Field) {
  return getStream<T>('valueSourceMap', field);
}

/** the value stream, will block the update, should update manually */
export function getInstantValueSource<T>(field: Field) {
  return getStream<T>('instantValueSourceMap', field);
}

/** the blur stream, with event */
export function getBlurSource<T>(field: Field) {
  return getStream<T>('blurSourceMap', field);
}

/** the blur stream, with value */
export function getBlurValueSource<T>(field: Field): Observable<T> {
  const currentStream = getSourceFieldFromType('blurValueMap', field);
  if (currentStream) {
    return currentStream as Observable<T>;
  }

  const valueSource = getValueSource<T>(field);
  const blurSource = getBlurSource(field);

  const source = valueSource.pipe(
    switchMap((value) => blurSource.pipe(map(() => value)))
  );
  setSourceFieldFromType('blurValueMap', field, source);

  return source;
}

export function getChangeSource<T>(field: Field) {
  return getStream<T>('changeSourceMap', field);
}

/** set certain field value */
export function setValue(field: Field, ...values: any[]) {
  const setValueMethod = getSourceFieldFromType('setValueMap', field);
  return setValueMethod?.(...values);
}

/** register a field */
export function useRegisterField(data: {
  field: Field;
  setValueMethod: any;
  value: any;
}) {
  const { field, setValueMethod, value } = data;

  useMemo(() => {
    registerSetValueMethod(field, setValueMethod);
  }, [setValueMethod, getFieldId(field)]);

  useEffect(() => {
    getSourceFieldFromType('valueSourceMap', field)?.next(value);
  }, [value]);
}

export function createLogic() {}

// ====== API END ===== //

// ====== COMPONENT ===== //
/** to wrap target Element */
function isFunction(value: any) {
  return typeof value === 'function';
}

export function Wrap(props: any) {
  const { children, value, name, onChange, namespace } = props;
  const field = {
    name,
    namespace,
  };

  useRegisterField({
    field,
    setValueMethod: onChange,
    value,
  });

  function handleChange(event: any) {
    const val = event.target.value;
    const insSource = getSourceFieldFromType('instantValueSourceMap', field);
    const changeSource = getSourceFieldFromType('changeSourceMap', field);
    if (insSource) {
      insSource.next(val);
      changeSource?.next(val);
      return;
    }
    changeSource?.next(val);
    onChange(val);
  }

  function handleBlur(event: any) {
    getSourceFieldFromType('blurSourceMap', field)?.next(event);
  }

  if (React.Children.only(children)) {
    return React.cloneElement(children, {
      value: value,
      onChange: handleChange,
      onBlur: handleBlur,
    });
  }

  if (isFunction(children)) {
    return children({
      handleChange,
      handleBlur,
    });
  }

  return <>{children}</>;
}

// ====== COMPONENT END ===== //
