import { createContext, useContext } from 'use-context-selector';
import { type MetaOperator } from '../Operators/Operator';
import { useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { getAllOperators } from '../Operators';

interface IOperatorContextState {
  operators: MetaOperator[];
  refreshOperators: () => void;
}

const OperatorContext = createContext<IOperatorContextState>({
  operators: [],
  refreshOperators: () => undefined
});

export function OperatorProvider(props: React.PropsWithChildren<any>) {
  const [operators, setOperators] = useState<MetaOperator[]>(getAllOperators());

  const refreshOperators = useMemoizedFn(() => {
    setOperators(getAllOperators());
  });

  return (
    <OperatorContext.Provider
      value={{
        operators,
        refreshOperators
      }}
    >
      {props?.children}
    </OperatorContext.Provider>
  );
}

export function useOperators() {
  return useContext(OperatorContext);
}
