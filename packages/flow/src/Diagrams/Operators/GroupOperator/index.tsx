import { MetaOperator } from '../Operator';
import { type Node } from 'reactflow';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import {
  type IHookOption,
  type IAttributeControlOption,
  type IGroupOperatorData,
} from '../types';
import { type IGenerationOption } from '../../Compiler';
import { Layer, findLayer } from '../../State/Layer';
import { AttributeControl } from './AttributeControl';
import {
  generateEndPointList,
  getNodeEndPointFromLayer,
  getInputPorts,
  getOutputPorts,
} from './utils';

export class GroupOperator
  extends MetaOperator<IGroupOperatorData>
  implements MetaOperator<IGroupOperatorData>
{
  description: string = '双击编辑';

  isUnique?: boolean | undefined = false;
  nodeColor?: string | undefined = '#FBCB0A';

  constructor() {
    super({
      operatorName: 'Group',
      operatorType: 'GroupOperator',
      nodeType: NodeTypeEnum.Node,
      endPointOptions: {
        endPointList: generateEndPointList(),
      },
    });
  }

  // todo
  onAfterCreate(options: IHookOption<Node<IGroupOperatorData>>) {
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
          currentActiveLayer.nodes = currentActiveLayer.nodes.concat(
            node as Node<IGroupOperatorData>,
          );
        }
        currentActiveLayer.children.push(newLayer);
      }
      return { ...layer };
    });

    // setActiveLayerId(newLayer.id);
  }

  generateAttributeControl(
    options: IAttributeControlOption<Node<IGroupOperatorData>>,
  ) {
    const { node } = options;
    return (
      <div>
        <AttributeControl node={node} />
      </div>
    );
  }

  generateBlockDeclarations(
    options: IGenerationOption<IGroupOperatorData>,
  ): string[] {
    const { node, nodeGraph, formatVariableName, formatBlockVarName } = options;

    return [
      `const temp_${formatVariableName(
        node.id,
      )} = context.mount(${formatBlockVarName(node.data.layerId)}, {
        ${getInputPorts(node)
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
      ...(getOutputPorts(node) || [])?.map((port) => {
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
    _options: IGenerationOption<IGroupOperatorData>,
  ): string[] {
    return [];
  }

  getFreshNodeData(options: IHookOption<Node<IGroupOperatorData>>) {
    const { node, currentState } = options;
    const { layer } = currentState;

    const targetLayer = findLayer(layer, node.data.layerId);

    if (targetLayer) {
      const { endPointList } = getNodeEndPointFromLayer(targetLayer, node.id);

      return {
        targetLayer,
        updatedNodeData: {
          endPointOptions: {
            endPointList,
          },
        },
      };
    }
  }

  refreshNode(options: IHookOption<Node<IGroupOperatorData>>) {
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

  onNodeDoubleClick(option: IHookOption<Node<IGroupOperatorData>>): void {
    const { node, actions } = option;
    actions?.setActiveLayerId(node?.data?.layerId);
  }

  onNodeFocus(options: IHookOption<Node<IGroupOperatorData>>): void {
    this?.refreshNode(options);
  }
}
