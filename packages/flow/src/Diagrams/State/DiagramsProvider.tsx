import {
  createContext,
  useContextSelector,
  useContext,
} from 'use-context-selector';
import React, { useCallback, useState } from 'react';
import {
  ReactFlowProvider,
  type Node,
  type Edge,
  useUpdateNodeInternals,
} from 'reactflow';

export interface DiagramsContextType<T = any> {
  nodes: Node<T>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<T>[]>>;
  updateNode: (id: string, action: React.SetStateAction<Node<T>>) => void;

  edges: Edge<T>[];
  setEdges: React.Dispatch<React.SetStateAction<Edge<T>[]>>;
  updateEdge: (id: string, action: React.SetStateAction<Edge<T>>) => void;
}

export const DiagramsContext = createContext<DiagramsContextType>({
  nodes: [],
  setNodes: (() => undefined) as any,
  updateNode: (() => undefined) as any,

  edges: [],
  setEdges: (() => undefined) as any,
  updateEdge: (() => undefined) as any,
});

export function useDiagramsContext() {
  return useContext(DiagramsContext);
}

export function useDiagramsContextSelector<T>(
  selector: (ctx: DiagramsContextType) => T,
) {
  return useContextSelector(DiagramsContext, selector);
}

export function useDiagramsState() {
  const nodes = useDiagramsContextSelector((ctx) => ctx.nodes);
  const edges = useDiagramsContextSelector((ctx) => ctx.edges);
  return {
    nodes,
    edges,
  };
}

export function useDiagramsActions() {
  const setEdges = useDiagramsContextSelector((ctx) => ctx.setEdges);
  const setNodes = useDiagramsContextSelector((ctx) => ctx.setNodes);
  const updateEdge = useDiagramsContextSelector((ctx) => ctx.updateEdge);
  const updateNode = useDiagramsContextSelector((ctx) => ctx.updateNode);

  return {
    setEdges,
    setNodes,
    updateEdge,
    updateNode,
  };
}

export const DiagramsContextInnerProvider: React.FC = (props) => {
  const { children } = props;
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const updateNodeInternals = useUpdateNodeInternals();

  const updateEdge = useCallback(
    (
      id: string,
      updateElementAction: React.SetStateAction<Edge>,
      updateInternal?: boolean,
    ) => {
      if (!id) {
        return;
      }

      setEdges((eles) => {
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
    [updateNodeInternals],
  );

  const updateNode = useCallback(
    (
      id: string,
      updateElementAction: React.SetStateAction<Node>,
      updateInternal?: boolean,
    ) => {
      if (!id) {
        return;
      }

      setNodes((eles) => {
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
    [updateNodeInternals],
  );

  return (
    <DiagramsContext.Provider
      value={{
        nodes,
        edges,
        updateEdge,
        updateNode,
        setEdges,
        setNodes,
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
