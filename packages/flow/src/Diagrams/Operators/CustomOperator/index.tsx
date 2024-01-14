import { MetaOperator } from '../Operator';
import { getOperatorFromNode } from '../OperatorMap';
import { type Node } from 'reactflow';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import {
  type IHookOption,
  type IAttributeControlOption,
  type IInputOperatorData,
  type IOutputOperatorData,
  type ICustomOperatorData,
  EndPoint,
} from '../types';
import { type IGenerationOption } from '../../Compiler/graph';
import { Layer, findLayer } from '../../State/Layer';
import { AttributeControl } from './AttributeControl';
import { type InputOperator } from '../InputOperator';
import { type OutputOperator } from '../OutputOperator';

function generateEndPointList(data?: {
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
      hint: 'outputState',
    }),
    new EndPoint({
      type: 'group',
      label: 'Event',
      children: data?.outputEventList || [],
      allowAddAndRemoveChildren: false,
      hint: 'outputEvent',
    }),
    // input
    new EndPoint({
      type: 'group',
      label: 'State',
      children: data?.inputStateList || [],
      allowAddAndRemoveChildren: false,
      hint: 'inputState',
    }),
    new EndPoint({
      type: 'group',
      label: 'Event',
      children: data?.inputEventList || [],
      allowAddAndRemoveChildren: false,
      hint: 'inputEvent',
    }),
  ];
}

export class CustomOperator
  extends MetaOperator<ICustomOperatorData>
  implements MetaOperator<ICustomOperatorData>
{
  description: string = '双击编辑';

  isUnique?: boolean | undefined = false;
  nodeColor?: string | undefined = '#FBCB0A';

  constructor() {
    super({
      operatorName: 'Custom',
      operatorType: 'CustomOperator',
      nodeType: NodeTypeEnum.Node,
      endPointOptions: {
        endPointList: generateEndPointList(),
      },
    });
  }

  getOutputPorts(node: Node<ICustomOperatorData>) {
    const eventPorts =
      node.data?.endPointOptions?.endPointList
        ?.filter(
          (item) =>
            item.type === 'group' &&
            ['outputState', 'outputEvent'].includes(item.hint || ''),
        )
        .map((item) => item?.children)
        ?.flat()
        .filter((x): x is EndPoint => !!x) || [];

    return eventPorts;
  }

  getInputPorts(node: Node<ICustomOperatorData>) {
    const eventPorts =
      node.data?.endPointOptions?.endPointList
        ?.filter(
          (item) =>
            item.type === 'group' &&
            ['inputState', 'inputEvent'].includes(item.hint || ''),
        )
        .map((item) => item?.children)
        .flat()
        .filter((x): x is EndPoint => !!x) || [];

    return eventPorts;
  }

  // todo
  onAfterCreate(options: IHookOption<Node<ICustomOperatorData>>) {
    const { node, actions, currentState } = options;
    const { setLayer } = actions;
    const { activeLayerId, layer } = currentState;

    const currentActiveLayer = findLayer(layer, activeLayerId);
    const newLayer = new Layer(node.data.operatorName);
    newLayer.relativeNodeId = node.id;
    newLayer.parentLayerId = currentActiveLayer?.id;
    node.data.layerId = newLayer.id;
    // todo: 设置之后不会马上展示新的 node，需要排查
    setLayer((layer) => {
      const currentActiveLayer = findLayer(layer, activeLayerId);
      if (currentActiveLayer) {
        if (!currentActiveLayer.nodes.find((item) => item.id === node.id)) {
          currentActiveLayer.nodes = currentActiveLayer.nodes.concat(node);
        }
        currentActiveLayer.children.push(newLayer);
      }
      return { ...layer };
    });

    // setActiveLayerId(newLayer.id);
  }

  generateAttributeControl(
    options: IAttributeControlOption<Node<ICustomOperatorData>>,
  ) {
    const { node } = options;
    return (
      <div>
        <AttributeControl node={node} />
      </div>
    );
  }

  generateBlockDeclarations(
    options: IGenerationOption<ICustomOperatorData>,
  ): string[] {
    const { node, nodeGraph, formatVariableName, formatBlockVarName } = options;

    return [
      `const temp_${formatVariableName(
        node.id,
      )} = context.mount(${formatBlockVarName(node.data.layerId)}, {
        ${this.getInputPorts(node)
          .map((port) => {
            const sourceId = nodeGraph
              .findSourceNodes(node.id)
              ?.find((item) => item.handleId === port.id)?.relatedHandleId;

            if (!sourceId) {
              return '';
            }

            return `['${port.variableName}']: ${formatVariableName(
              sourceId || '',
            )}`;
          })
          .filter(Boolean)
          .join(',\n')}
      })`,
      ...(this.getOutputPorts(node) || [])?.map((port) => {
        return `const ${formatVariableName(
          port.id,
        )} = temp_${formatVariableName(node.id)}.output['${
          port.variableName
        }']`;
      }),
    ];
  }

  generateBlockOutput(options: IGenerationOption<any>): string[] {
    return [];
  }

  generateBlockRelation(
    _options: IGenerationOption<ICustomOperatorData>,
  ): string[] {
    return [];
  }

  getFreshNodeData(options: IHookOption<Node<ICustomOperatorData>>) {
    const { node, currentState } = options;
    const { layer } = currentState;

    const targetLayer = findLayer(layer, node.data.layerId);

    if (targetLayer) {
      const inputNode = targetLayer.nodes.find(
        (item): item is Node<IInputOperatorData> =>
          getOperatorFromNode(item)?.operatorType === 'InputOperator',
      );
      const outputNode = targetLayer.nodes.find(
        (item): item is Node<IOutputOperatorData> =>
          getOperatorFromNode(item)?.operatorType === 'OutputOperator',
      );

      const inputOperator = getOperatorFromNode<InputOperator>(inputNode);
      const outputOperator = getOperatorFromNode<OutputOperator>(outputNode);

      function getNewEndPortId(id: string) {
        return `${id}__${node.id.slice(-5)}`;
      }

      const inputStatePorts = !inputNode
        ? []
        : inputOperator?.getStatePort(inputNode)?.map(
            (item) =>
              new EndPoint({
                ...item,
                id: getNewEndPortId(item.id),
                type: 'target',
              }),
          );
      const inputEventPorts = !inputNode
        ? []
        : inputOperator?.getEventPorts(inputNode)?.map(
            (item) =>
              new EndPoint({
                ...item,
                id: getNewEndPortId(item.id),
                type: 'target',
              }),
          );

      const outputStatePort = !outputNode
        ? []
        : outputOperator?.getStatePort(outputNode)?.map(
            (item) =>
              new EndPoint({
                ...item,
                id: getNewEndPortId(item.id),
                type: 'source',
              }),
          );

      const outputEventPort = !outputNode
        ? []
        : outputOperator?.getEventPorts(outputNode)?.map(
            (item) =>
              new EndPoint({
                ...item,
                id: getNewEndPortId(item.id),
                type: 'source',
              }),
          );

      return {
        targetLayer,
        updatedNodeData: {
          endPointOptions: {
            endPointList: generateEndPointList({
              inputEventList: inputEventPorts || [],
              inputStateList: inputStatePorts || [],
              outputEventList: outputEventPort || [],
              outputStateList: outputStatePort || [],
            }),
          },
        },
      };
    }
  }

  refreshNode(options: IHookOption<Node<ICustomOperatorData>>) {
    const { node } = options;
    const data = this.getFreshNodeData(options);
    if (data?.updatedNodeData) {
      options.actions.updateNode(
        node.id,
        (v) => this.updateData(v, data.updatedNodeData),
        { updateInternal: true, layerId: data.targetLayer?.parentLayerId },
      );
    }
  }

  onNodeDoubleClick(option: IHookOption<Node<ICustomOperatorData>>): void {
    const { node, actions } = option;
    actions?.setActiveLayerId(node?.data?.layerId);
  }

  onNodeFocus(options: IHookOption<Node<ICustomOperatorData>>): void {
    this?.refreshNode(options);
  }
}
