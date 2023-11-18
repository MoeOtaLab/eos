import React from 'react';
import { useStore, isNode } from 'reactflow';
import { useDiagramsContextSelector } from '../../State/DiagramsProvider';
import { OperatorMap } from '../../Operators';
import { type Operator } from '../../Operators/Operator';

export const AttributePanel: React.FC = () => {
  const selectedElements = useStore((ctx) =>
    ctx.getNodes()?.filter((item) => isNode(item) && item.selected));
  const selectedElement = selectedElements?.[0];

  const selectedElementNode = useDiagramsContextSelector((ctx) =>
    ctx.nodes.find((item) => item.id === selectedElement?.id) as Operator);

  const operatorType = selectedElementNode?.data?.operatorType;
  const Operator = OperatorMap.get(operatorType);
  const showConfig = selectedElements?.length === 1 && operatorType;

  const updateNode = useDiagramsContextSelector((ctx) => ctx.updateNode);

  return (
    <div>
      <div>Attribute Panel</div>
      {showConfig &&
        Operator?.generateAttributeControl?.({
          value: selectedElementNode as any,
          actions: {
            updateElement: updateNode,
          },
        })}
    </div>
  );
};
