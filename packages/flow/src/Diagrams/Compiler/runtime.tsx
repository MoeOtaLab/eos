import { type Edge, type Node } from 'reactflow';
import React, { useState, useMemo, useEffect, useContext } from 'react';
import * as EosCore from '@eos/core/src';

export const EosCoreSymbol = 'EosCore';

export interface RuntimeContextState {
  store: { exports: any };
  nodes: Node[];
  edges: Edge[];
}

export const RuntimeContext = React.createContext<RuntimeContextState>({
  store: { exports: {} },
  nodes: [],
  edges: [],
});

export function useLinkRuntimeContext() {
  return useContext(RuntimeContext);
}

export function runCode(code: string) {
  const moduleData = { exports: {} };
  // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
  const runLinkLogic = new Function(EosCoreSymbol, 'module', code);
  runLinkLogic(EosCore, moduleData);
  return moduleData;
}

interface LinkRuntimeContextProviderProps {
  value: string;
  nodes: Node[];
  edges: Edge[];
}

export const LinkRuntimeContextProvider: React.FC<
  LinkRuntimeContextProviderProps
> = (props) => {
  const { value, children, nodes, edges } = props;
  const [store, setStore] = useState<RuntimeContextState['store']>({
    exports: {},
  });

  const contextValue = useMemo(
    () => ({
      store,
      nodes,
      edges,
    }),
    [store, nodes, edges],
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
    <RuntimeContext.Provider value={contextValue}>
      {children}
    </RuntimeContext.Provider>
  );
};
