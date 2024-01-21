import {
  createContext,
  useContextSelector,
  useContext,
} from 'use-context-selector';
import React, { useRef, useState } from 'react';
import {
  ReactFlowProvider,
  type Node,
  type Edge,
  useUpdateNodeInternals,
} from 'reactflow';
import { Layer, findLayer } from './Layer';
import { useLatest, useMemoizedFn } from 'ahooks';
import { getOperatorFromNode } from '../Operators';
import { type IGroupOperatorData } from '../Operators/types';
import { type GroupOperator } from '../Operators/GroupOperator';

interface IUpdateNodeOption {
  updateInternal?: boolean;
  layerId?: string;
}

type ISetNodeOption = Pick<IUpdateNodeOption, 'layerId'>;

type ISetEdgeOption = ISetNodeOption;

export interface DiagramsContextType<T = any> {
  /** ====== current ====== */
  nodes: Node<T>[];
  setNodes: (
    action: React.SetStateAction<Node<T>[]>,
    options?: ISetNodeOption,
  ) => void;
  updateNode: (
    id: string,
    action: React.SetStateAction<Node<T>>,
    options?: IUpdateNodeOption,
  ) => void;

  edges: Edge<T>[];
  setEdges: (
    action: React.SetStateAction<Edge<T>[]>,
    options?: ISetEdgeOption,
  ) => void;
  updateEdge: (
    id: string,
    action: React.SetStateAction<Edge<T>>,
    options?: ISetEdgeOption,
  ) => void;

  /** ====== all ====== */
  layer: Layer;
  activeLayerId: string;
  setLayer: React.Dispatch<React.SetStateAction<Layer>>;
  setActiveLayerId: (id: Layer['id']) => void;
}

const defaultLayer = new Layer('App');

export const DiagramsContext = createContext<DiagramsContextType>({
  nodes: [],
  setNodes: (() => undefined) as any,
  updateNode: (() => undefined) as any,

  edges: [],
  setEdges: (() => undefined) as any,
  updateEdge: (() => undefined) as any,

  layer: defaultLayer,
  setLayer: (() => undefined) as any,
  activeLayerId: defaultLayer.id,
  setActiveLayerId: (() => undefined) as any,
});

export function useDiagramsContext() {
  return useContext(DiagramsContext);
}

export function useDiagramsContextSelector<T>(
  selector: (ctx: DiagramsContextType) => T,
) {
  return useContextSelector(DiagramsContext, selector);
}

export function useDiagramsHookOption() {
  const {
    nodes,
    edges,
    updateEdge,
    updateNode,
    setActiveLayerId,
    setLayer,
    setEdges,
    layer,
    activeLayerId,
  } = useDiagramsContext();

  const currentStateRef = useLatest({
    nodes,
    edges,
    layer,
    activeLayerId,
  });
  const actionsRef = useLatest({
    updateEdge,
    updateNode,
    setEdges,
    setActiveLayerId,
    setLayer,
  });

  return {
    currentStateRef,
    actionsRef,
  };
}

export function useDiagramsState() {
  const nodes = useDiagramsContextSelector((ctx) => ctx.nodes);
  const edges = useDiagramsContextSelector((ctx) => ctx.edges);
  const layer = useDiagramsContextSelector((ctx) => ctx.layer);
  return {
    nodes,
    edges,
    layer,
  };
}

export function useDiagramsActions() {
  const setEdges = useDiagramsContextSelector((ctx) => ctx.setEdges);
  const setNodes = useDiagramsContextSelector((ctx) => ctx.setNodes);
  const updateEdge = useDiagramsContextSelector((ctx) => ctx.updateEdge);
  const updateNode = useDiagramsContextSelector((ctx) => ctx.updateNode);
  const setLayer = useDiagramsContextSelector((ctx) => ctx.setLayer);
  const setActiveLayerId = useDiagramsContextSelector(
    (ctx) => ctx.setActiveLayerId,
  );

  return {
    setEdges,
    setNodes,
    updateEdge,
    updateNode,
    setLayer,
    setActiveLayerId,
  };
}

export const DiagramsContextInnerProvider: React.FC = (props) => {
  const { children } = props;

  const [_layer, _setLayer] = useState(() => new Layer('App'));
  const layerRef = useRef(_layer);
  const layer = layerRef.current;

  const [activeLayerId, _setActiveLayerId] = useState(layer.id);
  const activeLayer = findLayer(layer, activeLayerId);
  const nodes = activeLayer?.nodes || [];
  const edges = activeLayer?.edges || [];

  const setLayer = useMemoizedFn(function setLayer(
    action: React.SetStateAction<Layer>,
  ) {
    layerRef.current =
      typeof action === 'function' ? action(layerRef.current) : action;
    _setLayer(layerRef.current);
  });

  const setNodes = useMemoizedFn(function setNodes(
    action: React.SetStateAction<Node[]>,
    options?: ISetNodeOption,
  ) {
    setLayer((layer) => {
      const activeLayer = findLayer(layer, options?.layerId || activeLayerId);
      if (activeLayer) {
        activeLayer.nodes =
          typeof action === 'function' ? action(activeLayer.nodes) : action;

        const nodeIdSet = new Set(activeLayer.nodes.map((item) => item.id));
        // update nodes & children
        activeLayer.children = activeLayer.children.filter(
          (item) => item.relativeNodeId && nodeIdSet.has(item.relativeNodeId),
        );
      }
      return { ...layer };
    });
  });

  const setEdges = useMemoizedFn(function setEdges(
    action: React.SetStateAction<Edge[]>,
    options?: ISetEdgeOption,
  ) {
    setLayer((layer) => {
      const activeLayer = findLayer(layer, options?.layerId || activeLayerId);
      if (activeLayer) {
        activeLayer.edges =
          typeof action === 'function' ? action(activeLayer.edges) : action;
      }
      return { ...layer };
    });
  });

  const updateNodeInternals = useUpdateNodeInternals();

  const updateEdge = useMemoizedFn(function updateEdge(
    id: string,
    updateElementAction: React.SetStateAction<Edge>,
    options?: ISetEdgeOption,
  ) {
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
    }, options);
  });

  const updateNode = useMemoizedFn(function updateNode(
    id: string,
    updateElementAction: React.SetStateAction<Node>,
    option?: IUpdateNodeOption,
  ) {
    if (!id) {
      return;
    }

    const { updateInternal, layerId } = option || {};

    setNodes(
      (eles) => {
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
      },
      { layerId },
    );

    if (updateInternal) {
      setTimeout(() => {
        updateNodeInternals(id);
      }, 0);
    }
  });

  const currentStateRef = useLatest({
    nodes,
    edges,
    layer,
    activeLayerId,
  });
  const actionsRef = useLatest({
    updateEdge,
    updateNode,
    setEdges,
    setActiveLayerId: () => undefined,
    setLayer,
  });

  const setActiveLayerId = useMemoizedFn((activeId: string) => {
    const prevActiveId = activeLayerId;
    _setActiveLayerId(activeId);

    setTimeout(() => {
      const prevLayer = findLayer(layer, prevActiveId);

      if (prevLayer?.parentLayerId) {
        const parentLayer = findLayer(layer, prevLayer.parentLayerId);
        const targetNode = parentLayer?.nodes.find(
          (item) => item.id === prevLayer.relativeNodeId,
        ) as Node<IGroupOperatorData>;

        if (targetNode) {
          const operator = getOperatorFromNode<GroupOperator>(targetNode);

          operator?.refreshNode({
            node: targetNode,
            actions: actionsRef.current,
            currentState: currentStateRef.current,
          });
        }
      }
    });
  });

  return (
    <DiagramsContext.Provider
      value={{
        nodes,
        edges,
        updateEdge,
        updateNode,
        setEdges,
        setNodes,
        layer,
        activeLayerId,
        setLayer,
        setActiveLayerId,
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
