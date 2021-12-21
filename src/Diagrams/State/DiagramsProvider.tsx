import {
  createContext,
  useContextSelector,
  useContext,
} from 'use-context-selector';
import React, { useCallback, useState } from 'react';
import {
  ReactFlowProvider,
  Elements,
  FlowElement,
  useUpdateNodeInternals,
} from 'react-flow-renderer';

export type DiagramsContextType<T = FlowElement> = {
  elements: T[];
  setElements: React.Dispatch<React.SetStateAction<T[]>>;
  updateElement: (id: string, action: React.SetStateAction<T>) => void;
};

export const DiagramsContext = createContext<DiagramsContextType>({
  elements: [],
  setElements: (() => {}) as any,
  updateElement: (() => {}) as any,
});

export function useDiagramsContext() {
  return useContext(DiagramsContext);
}

export function useDiagramsContextSelector<T>(
  selector: (ctx: DiagramsContextType) => T
) {
  return useContextSelector(DiagramsContext, selector);
}

export function useDiagramsState() {
  const elements = useDiagramsContextSelector((ctx) => ctx.elements);
  return {
    elements,
  };
}

export function useDiagramsActions() {
  const updateElement = useDiagramsContextSelector((ctx) => ctx.updateElement);
  const setElements = useDiagramsContextSelector((ctx) => ctx.setElements);

  return {
    updateElement,
    setElements,
  };
}

export const DiagramsContextInnerProvider: React.FC = (props) => {
  const { children } = props;
  const [elements, setElements] = useState<Elements>([]);
  const updateNodeInternals = useUpdateNodeInternals();

  const updateElement = useCallback(
    (
      id: string,
      updateElementAction: React.SetStateAction<FlowElement>,
      updateInternal?: boolean
    ) => {
      if (!id) {
        return;
      }

      setElements((eles) => {
        const targetIndex = eles.findIndex((item) => item.id === id);

        if (targetIndex < 0) {
          return eles;
        }

        const elesWillUpdate = [...eles];
        const target = elesWillUpdate.splice(targetIndex, 1)?.[0];
        const res =
          typeof updateElementAction === 'function'
            ? updateElementAction(target)
            : updateElementAction;
        return elesWillUpdate.concat(res);
      });

      if (updateInternal) {
        setTimeout(() => {
          updateNodeInternals(id);
        }, 0);
      }
    },
    [updateNodeInternals]
  );

  return (
    <DiagramsContext.Provider
      value={{
        elements,
        setElements,
        updateElement,
      }}
    >
      {children}
    </DiagramsContext.Provider>
  );
};

export const DiagramsContextProvider: React.FC = (props) => {
  const { children } = props;

  return (
    <ReactFlowProvider>
      <DiagramsContextInnerProvider>{children}</DiagramsContextInnerProvider>
    </ReactFlowProvider>
  );
};
