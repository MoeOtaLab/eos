import React from 'react';
import { useStoreState, isNode } from 'react-flow-renderer';
import { useDiagramsContextSelector } from '../../State/DiagramsProvider';
import { OperatorMap } from '../../Operators';
import { Operator } from '../../Operators/Operator';

export const AttributePanel: React.FC = () => {
  const selectedElements = useStoreState((ctx) =>
    ctx.selectedElements?.filter((item) => isNode(item))
  );
  const selectedElement = selectedElements?.[0];

  const selectedElementNode = useDiagramsContextSelector(
    (ctx) =>
      ctx.elements.find((item) => item.id === selectedElement?.id) as Operator
  );

  const operatorType = selectedElementNode?.data?.operatorType;
  const Operator = OperatorMap.get(operatorType);
  const showConfig = selectedElements?.length === 1 && operatorType;

  const updateElement = useDiagramsContextSelector((ctx) => ctx.updateElement);

  return (
    <div>
      <div>Attribute Panel</div>
      {showConfig &&
        Operator?.generateAttributeControl?.({
          value: selectedElementNode as any,
          actions: {
            updateElement,
          },
        })}
    </div>
  );
};
