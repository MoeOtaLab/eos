import React from 'react';
import { useStore } from 'reactflow';
import {
  useDiagramsContextSelector,
  useDiagramsActions,
} from '../../State/DiagramsProvider';
import { OperatorMap } from '../../Operators';
import { type Operator } from '../../Operators/Operator';

export const AttributePanel: React.FC = () => {
  const selectedElement = useStore((ctx) => {
    const selectedElements = ctx.getNodes()?.filter((item) => item.selected);
    if (selectedElements?.length === 1) {
      return selectedElements[0];
    }
    return undefined;
  });

  const selectedElementNode = useDiagramsContextSelector(
    (ctx) =>
      ctx.nodes.find((item) => item.id === selectedElement?.id) as Operator,
  );

  const operatorType = selectedElementNode?.data?.operatorType;
  const Operator = OperatorMap.get(operatorType);
  const showConfig = !!selectedElement && operatorType;

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
