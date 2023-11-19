import React, { useState, useMemo, useEffect, useContext, useRef } from 'react';
import { type LogicStateStore, LogicStateStoreSymbol } from './flowGraph';
import * as Rx from 'rxjs';
import * as operations from '../Operators/operations';
import * as link from '../../Link/link';
import { useObservable } from 'rxjs-hooks';

export interface LinkRuntimeContextState {
  store: LogicStateStore;
}

export const LinkRuntimeContext = React.createContext<LinkRuntimeContextState>({
  store: new Map(),
});

export function useLinkRuntimeContext() {
  return useContext(LinkRuntimeContext);
}

export function runCode(code: string) {
  const logicStateStore: LogicStateStore = new Map();
  // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
  const runLinkLogic = new Function(
    'Rx',
    'operations',
    'link',
    LogicStateStoreSymbol,
    code,
  );
  runLinkLogic(Rx, operations, link, logicStateStore);
  return logicStateStore;
}

interface LinkRuntimeContextProviderProps {
  value: string;
}

export const LinkRuntimeContextProvider: React.FC<
  LinkRuntimeContextProviderProps
> = (props) => {
  const { value, children } = props;
  const [store, setStore] = useState<LogicStateStore>(new Map());

  const contextValue = useMemo(
    () => ({
      store,
    }),
    [store],
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
  const targetSubject = useRef(new Rx.Subject());

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
