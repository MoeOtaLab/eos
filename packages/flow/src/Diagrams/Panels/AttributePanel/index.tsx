import React from 'react';
import { useStore, isNode } from 'reactflow';
import {
  useDiagramsContextSelector,
  useDiagramsActions,
} from '../../State/DiagramsProvider';
import { OperatorMap } from '../../Operators';
import { type Operator } from '../../Operators/Operator';

export const AttributePanel: React.FC = () => {
  const selectedElements = useStore(
    (ctx) => ctx.getNodes()?.filter((item) => isNode(item) && item.selected),
  );
  const selectedElement = selectedElements?.[0];

  const selectedElementNode = useDiagramsContextSelector(
    (ctx) =>
      ctx.nodes.find((item) => item.id === selectedElement?.id) as Operator,
  );

  const operatorType = selectedElementNode?.data?.operatorType;
  const Operator = OperatorMap.get(operatorType);
  const showConfig = selectedElements?.length === 1 && operatorType;

  const { updateEdge, updateNode } = useDiagramsActions();

  return (
    <div>
      <div>Attributes</div>
      {showConfig &&
        Operator?.generateAttributeControl?.({
          value: selectedElementNode as any,
          node: selectedElementNode,
          actions: {
            updateElement: updateNode,
            updateEdge,
            updateNode,
          },
        })}
    </div>
  );
};
