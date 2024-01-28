import { type Node } from 'reactflow';
import { type Layer } from '../../State/Layer';
import { getOperatorFromNode } from '../OperatorMap';
import {
  EndPoint,
  type IOutputOperatorData,
  type IInputOperatorData,
  type IMetaOperatorData
} from '../types';
import { type InputOperator } from '../InputOperator';
import { type OutputOperator } from '../OutputOperator';

export function generateEndPointList(data?: {
  outputStateList: EndPoint[];
  outputEventList: EndPoint[];
  inputStateList: EndPoint[];
  inputEventList: EndPoint[];
}) {
  return [
    // output
    new EndPoint({
      type: 'group',
      label: 'State',
      children: data?.outputStateList || [],
      allowAddAndRemoveChildren: false,
      hint: 'outputState'
    }),
    new EndPoint({
      type: 'group',
      label: 'Event',
      children: data?.outputEventList || [],
      allowAddAndRemoveChildren: false,
      hint: 'outputEvent'
    }),
    // input
    new EndPoint({
      type: 'group',
      label: 'State',
      children: data?.inputStateList || [],
      allowAddAndRemoveChildren: false,
      hint: 'inputState'
    }),
    new EndPoint({
      type: 'group',
      label: 'Event',
      children: data?.inputEventList || [],
      allowAddAndRemoveChildren: false,
      hint: 'inputEvent'
    })
  ];
}

export function getNodeEndPointFromLayer(targetLayer: Layer, nodeId: Node<IMetaOperatorData>['id']) {
  const inputNode = targetLayer.nodes.find(
    (item): item is Node<IInputOperatorData> => getOperatorFromNode(item)?.operatorType === 'InputOperator'
  );
  const outputNode = targetLayer.nodes.find(
    (item): item is Node<IOutputOperatorData> => getOperatorFromNode(item)?.operatorType === 'OutputOperator'
  );

  const inputOperator = getOperatorFromNode<InputOperator>(inputNode);
  const outputOperator = getOperatorFromNode<OutputOperator>(outputNode);

  function getNewEndPortId(id: string) {
    return `${id}__${nodeId.slice(-5)}`;
  }

  const inputStatePorts = !inputNode
    ? []
    : inputOperator?.getStatePort(inputNode)?.map(
        (item) =>
          new EndPoint({
            ...item,
            id: getNewEndPortId(item.id),
            type: 'target'
          })
      );
  const inputEventPorts = !inputNode
    ? []
    : inputOperator?.getEventPorts(inputNode)?.map(
        (item) =>
          new EndPoint({
            ...item,
            id: getNewEndPortId(item.id),
            type: 'target'
          })
      );

  const outputStatePort = !outputNode
    ? []
    : outputOperator?.getStatePort(outputNode)?.map(
        (item) =>
          new EndPoint({
            ...item,
            id: getNewEndPortId(item.id),
            type: 'source'
          })
      );

  const outputEventPort = !outputNode
    ? []
    : outputOperator?.getEventPorts(outputNode)?.map(
        (item) =>
          new EndPoint({
            ...item,
            id: getNewEndPortId(item.id),
            type: 'source'
          })
      );

  return {
    endPointList: generateEndPointList({
      inputEventList: inputEventPorts || [],
      inputStateList: inputStatePorts || [],
      outputEventList: outputEventPort || [],
      outputStateList: outputStatePort || []
    })
  };
}

export function getOutputPorts(node: Node<IMetaOperatorData>) {
  const eventPorts =
    node.data?.endPointOptions?.endPointList
      ?.filter((item) => item.type === 'group' && ['outputState', 'outputEvent'].includes(item.hint || ''))
      .map((item) => item?.children)
      ?.flat()
      .filter((x): x is EndPoint => !!x) || [];

  return eventPorts;
}

export function getInputPorts(node: Node<IMetaOperatorData>) {
  const eventPorts =
    node.data?.endPointOptions?.endPointList
      ?.filter((item) => item.type === 'group' && ['inputState', 'inputEvent'].includes(item.hint || ''))
      .map((item) => item?.children)
      .flat()
      .filter((x): x is EndPoint => !!x) || [];

  return eventPorts;
}
