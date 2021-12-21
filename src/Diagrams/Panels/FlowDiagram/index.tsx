import React, { useRef, DragEventHandler, useEffect } from 'react';
import ReactFlow, {
  ReactFlowState,
  removeElements,
  addEdge,
  ReactFlowProps,
  useStoreActions,
  useStoreState,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  isEdge,
} from 'react-flow-renderer';
import { MODEL_FORMAT } from '../OperatorPanel';
import { OperatorMap } from '../../Operators';
import { useDiagramsContext } from '../../State/DiagramsProvider';
import { nodeTypes } from '../../Nodes';
import { isSameSourceHandle, isSameTargetHandle } from '../../utils';
import css from './FlowDiagram.module.less';

const initialElements = [
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

export const FlowDiagram: React.FC = () => {
  const { elements, setElements } = useDiagramsContext();

  useEffect(() => {
    setElements(initialElements as any);
  }, []);

  console.log({
    elements,
  });

  const onElementsRemove: ReactFlowProps['onElementsRemove'] = (
    elementsToRemove
  ) => setElements((els) => removeElements(elementsToRemove, els));

  const addSelectedElements = useStoreActions((ctx) => ctx.addSelectedElements);

  const onConnect: ReactFlowProps['onConnect'] = (params) => {
    const eles = addEdge(params, elements).filter((item) => {
      if (isEdge(item)) {
        if (
          !isSameSourceHandle(item, params) &&
          isSameTargetHandle(item, params)
        ) {
          return false;
        }
      }
      return true;
    });

    setElements(eles);
    setTimeout(() => {
      const targetEdge = eles.find((el) => {
        const edge = params;
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
      addSelectedElements([targetEdge].filter(Boolean));
    });
  };

  const dropTarget = useRef<HTMLDivElement>(null);

  const updateNodePos = useStoreActions((ctx) => ctx.updateNodePos);
  const nodesRef = useRef<ReactFlowState['nodes']>([]);
  useStoreState((ctx) => {
    nodesRef.current = ctx.nodes;
    return nodesRef;
  });

  const handleDrop: DragEventHandler = (event) => {
    const operatorName = event.dataTransfer.getData(MODEL_FORMAT);
    const Operator = OperatorMap.get(operatorName);

    if (Operator) {
      const operatorInstance = new Operator();
      const { clientX, clientY } = event;
      const rect = dropTarget.current?.getBoundingClientRect();
      if (rect) {
        operatorInstance.position = {
          x: clientX - rect.left,
          y: clientY - rect.y,
        };
        operatorInstance.style = {
          visibility: 'hidden',
        };
      }

      setElements((eles) => [...eles, operatorInstance]);
      setTimeout(() => {
        const node = nodesRef.current.find(
          (item) => item.id === operatorInstance.id
        );

        if (node) {
          const pos = {
            x: node?.position?.x - node?.__rf.width / 2,
            y: node.position.y - Math.max(node.__rf.height / 5, 30),
          };

          // TODO: zoom
          updateNodePos({
            id: node.id,
            pos,
          });
        }

        setElements((eles) => {
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
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        zoomOnScroll={false}
      >
        <Background
          variant={BackgroundVariant.Lines}
          gap={200}
          color="rgba(255,255,255,0.1)"
          size={1}
        />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};
