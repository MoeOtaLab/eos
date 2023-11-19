import React, {
  useRef,
  type DragEventHandler,
  useCallback,
  useEffect,
} from 'react';
import ReactFlow, {
  addEdge,
  type ReactFlowProps,
  useStore,
  isEdge,
  type Node,
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  // plugins
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
} from 'reactflow';
import { MODEL_FORMAT } from '../OperatorPanel';
import { OperatorMap } from '../../Operators';
import { useDiagramsContext } from '../../State/DiagramsProvider';
import { nodeTypes } from '../../Nodes';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { isSameSourceHandle, isSameTargetHandle } from '../../utils';
import { defaultDataWithOperator as defaultData } from './defaultData';
import css from './FlowDiagram.module.less';
import { message } from 'antd';

export const initialNodes: Node[] = [
  {
    id: '$flow_slgum',
    position: {
      x: 966,
      y: 99,
    },
    type: 'OperatorNode',
    data: {
      operatorType: 'TargetOperator',
      targetPorts: [
        {
          label: 'Target',
          id: 'Target',
        },
      ],
    },
    style: {
      visibility: 'visible',
    },
  },
  {
    id: '$flow_5i9q0',
    position: {
      x: 530,
      y: 115,
    },
    type: 'OperatorNode',
    data: {
      operatorType: 'AddOperator',
      targetPorts: [
        {
          label: 'Input_1',
          id: 'Input_1',
        },
        {
          label: 'Input_2',
          id: 'Input_2',
        },
      ],
      sourcePorts: [
        {
          label: 'Result',
          id: 'Result',
        },
      ],
    },
    style: {
      visibility: 'visible',
    },
  },
  {
    id: '$flow_x3gaw',
    position: {
      x: 319,
      y: 122,
    },
    type: 'OperatorNode',
    data: {
      operatorType: 'SourceOperator',
      sourcePorts: [
        {
          label: 'Source',
          id: 'Source',
        },
      ],
      dataSourceId: 'value',
    },
    style: {
      visibility: 'visible',
    },
  },
  {
    id: '$flow_qekmc',
    position: {
      x: 289,
      y: 229,
    },
    type: 'OperatorNode',
    data: {
      operatorType: 'SourceOperator',
      sourcePorts: [
        {
          label: 'Source',
          id: 'Source',
        },
      ],
      dataSourceId: 'value2',
    },
    style: {
      visibility: 'visible',
    },
  },
];
export const initialEdges = [
  {
    source: '$flow_x3gaw',
    sourceHandle: 'Source',
    target: '$flow_5i9q0',
    targetHandle: 'Input_1',
    id: 'reactflow__edge-$flow_x3gawSource-$flow_5i9q0Input_1',
  },
  {
    source: '$flow_qekmc',
    sourceHandle: 'Source',
    target: '$flow_5i9q0',
    targetHandle: 'Input_2',
    id: 'reactflow__edge-$flow_qekmcSource-$flow_5i9q0Input_2',
  },
  {
    source: '$flow_5i9q0',
    sourceHandle: 'Result',
    target: '$flow_slgum',
    targetHandle: 'Target',
    id: 'reactflow__edge-$flow_5i9q0Result-$flow_slgumTarget',
  },
];

const nodeColor = (node: Node) => {
  switch (node.type) {
    case 'OperatorNode':
      return '#6ede87';
    case NodeTypeEnum.StateNode:
      return '#0079FF';
    case NodeTypeEnum.InputNode:
    case NodeTypeEnum.OutputNode:
      return '#5D9C59';
    case NodeTypeEnum.StreamOperatorNode:
      return '#FF0060';
    default:
      return '#ff0072';
  }
};

export const FlowDiagram: React.FC = () => {
  const { nodes, edges, setNodes, setEdges } = useDiagramsContext();

  useEffect(() => {
    setNodes(defaultData.nodes);
    setEdges(defaultData.edges);
  }, []);

  const addSelectedEdges = useStore((ctx) => ctx.addSelectedEdges);

  const onConnect: ReactFlowProps['onConnect'] = (connection) => {
    console.log('connection', connection);
    setEdges((eds) =>
      addEdge(connection, eds).filter((item) => {
        if (isEdge(item)) {
          if (
            !isSameSourceHandle(item, connection) &&
            isSameTargetHandle(item, connection)
          ) {
            return false;
          }
        }
        return true;
      }),
    );

    setTimeout(() => {
      const targetEdge = edges.find((el) => {
        const edge = connection;
        return (
          isEdge(el) &&
          el.source === edge.source &&
          el.target === edge.target &&
          (el.sourceHandle === edge.sourceHandle ||
            (!el.sourceHandle && !edge.sourceHandle)) &&
          (el.targetHandle === edge.targetHandle ||
            (!el.targetHandle && !edge.targetHandle))
        );
      });
      addSelectedEdges(
        [targetEdge]
          .filter((item): item is Edge => Boolean(item))
          .map((item) => item.id),
      );
    });
  };

  const dropTarget = useRef<HTMLDivElement>(null);

  const updateNodePos = useStore((ctx) => ctx.updateNodePositions);
  const nodesRef = useRef<Node[]>([]);
  useStore((ctx) => {
    nodesRef.current = ctx.getNodes();
    return nodesRef;
  });

  const handleDrop: DragEventHandler = (event) => {
    const operatorName = event.dataTransfer.getData(MODEL_FORMAT);
    const Operator = OperatorMap.get(operatorName);

    if (Operator) {
      const operatorInstance = new Operator();
      if (operatorInstance.unique) {
        if (nodes.find((item) => item.type === operatorInstance.type)) {
          message.warning('只允许存在一个');
          return;
        }
      }
      const { clientX, clientY } = event;
      const rect = dropTarget.current?.getBoundingClientRect();
      if (rect) {
        operatorInstance.position = {
          x: clientX - rect.left,
          y: clientY - rect.y,
        };
      }

      setNodes((eles) => [...eles, operatorInstance]);
      setTimeout(() => {
        const node = nodesRef.current.find(
          (item) => item.id === operatorInstance.id,
        );

        if (node) {
          const pos = {
            x: node?.position?.x - (node?.width || 0) / 2,
            y: node.position.y - Math.max((node?.height || 0) / 5, 30),
          };

          node.position = pos;
          // TODO: zoom
          updateNodePos([node], false, false);
        }

        setNodes((eles) => {
          const target = eles.find((item) => item.id === operatorInstance.id);
          if (target) {
            operatorInstance.style = {
              visibility: 'visible',
            };
          }
          return [...eles];
        });
      });
    }
  };

  const handleDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes(MODEL_FORMAT)) {
      event.preventDefault();
    }
  };

  const onNodesChange = useCallback((changes) => {
    setNodes((ns) => applyNodeChanges(changes, ns));
  }, []);
  const onEdgesChange = useCallback((changes) => {
    setEdges((es) => applyEdgeChanges(changes, es));
  }, []);

  return (
    <div
      className={css['main-flow']}
      ref={dropTarget}
      onDrop={handleDrop}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
    >
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        zoomOnScroll={false}
        defaultEdgeOptions={{ animated: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          color="rgba(255,255,255,0.4)"
          size={2}
        />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Controls />
      </ReactFlow>
    </div>
  );
};
