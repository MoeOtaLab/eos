import React, { useState, useMemo, useEffect, useContext, useRef } from 'react';
import { LogicStateStore } from './flowGraph';
import * as _Rx from 'rxjs';
import * as _operations from '../Operators/operations';
import * as _link from '../../Link/link';
import { useObservable } from 'rxjs-hooks';

export type LinkRuntimeContextState = {
  store: LogicStateStore;
};

export const LinkRuntimeContext = React.createContext<LinkRuntimeContextState>({
  store: new Map(),
});

export function useLinkRuntimeContext() {
  return useContext(LinkRuntimeContext);
}

export function runCode(code: string) {
  const Rx = _Rx;
  const operations = _operations;
  const link = _link;
  // eslint-disable-next-line no-eval
  const store: LogicStateStore | undefined = eval(code);
  return store;
}

type LinkRuntimeContextProviderProps = {
  value: string;
};

export const LinkRuntimeContextProvider: React.FC<
  LinkRuntimeContextProviderProps
> = (props) => {
  const { value, children } = props;
  const [store, setStore] = useState<LogicStateStore>(new Map());

  const contextValue = useMemo(
    () => ({
      store,
    }),
    [store]
  );

  useEffect(() => {
    if (!value) {
      return;
    }

    const result = runCode(value);
    console.log({
      result,
    });
    if (result) {
      setStore(result);
    }
  }, [value]);

  return (
    <LinkRuntimeContext.Provider value={contextValue}>
      {children}
    </LinkRuntimeContext.Provider>
  );
};

export function useValue<T = any>(id: string) {
  const { store } = useLinkRuntimeContext();
  const targetSubject = useRef(new _Rx.Subject());

  useEffect(() => {
    const subscription = store.get(id)?.subscribe((...args) => {
      targetSubject.current.next(...args);
    });

    return () => {
      subscription?.unsubscribe();
      targetSubject.current.next(undefined);
    };
  }, [store, id]);

  const output = useObservable(() => targetSubject.current);
  return output as T;
}
