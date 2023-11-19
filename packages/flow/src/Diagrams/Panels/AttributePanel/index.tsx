import React from 'react';
import {
  useDiagramsContextSelector,
  useDiagramsActions,
} from '../../State/DiagramsProvider';
import { OperatorMap } from '../../Operators';
import { type Operator } from '../../Operators/Operator';

export const AttributePanel: React.FC = () => {
  const nodes = useDiagramsContextSelector((ctx) => ctx.nodes);
  const selectedElements = nodes.filter((item) => item.selected);

  const selectedElement =
    selectedElements?.length === 1 ? selectedElements[0] : undefined;

  const selectedElementNode = useDiagramsContextSelector(
    (ctx) =>
      ctx.nodes.find((item) => item.id === selectedElement?.id) as Operator,
  );

  const operatorType = selectedElementNode?.data?.operatorType;
  const Operator = OperatorMap.get(operatorType);
  const showConfig = !!selectedElement && operatorType;

  const { updateEdge, updateNode, setLayer } = useDiagramsActions();

  return (
    <div>
      <div>Attributes</div>
      {showConfig &&
        Operator?.generateAttributeControl?.({
          node: selectedElementNode,
          actions: {
            updateEdge,
            updateNode,
            setLayer,
          },
        })}
    </div>
  );
};