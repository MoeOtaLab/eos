import { Operator } from '../Operator';
import { type Node } from 'reactflow';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type ICustomNodeData } from '../../Nodes/types';
import { type IHookOption, type IAttributeControlOption } from '../types';
import { type IGenerationOption } from '../../Compiler/graph';
import { Layer, findLayer } from '../../State/Layer';
import { AttributeControl } from './AttributeControl';

export class CustomOperator extends Operator<ICustomNodeData> {
  constructor(data?: Partial<Node<Partial<ICustomNodeData>>>) {
    super('CustomOperator', {
      ...data,
      type: NodeTypeEnum.CustomNode,
    });

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [],
      targetPorts: [],
      operatorName: 'CustomOperator',
      description: '双击进入编辑',
      ...data?.data,
    } as ICustomNodeData;
  }

  static onAfterCreate(options: IHookOption<CustomOperator>) {
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

  static generateAttributeControl(
    options: IAttributeControlOption<CustomOperator>,
  ) {
    const { node } = options;
    return (
      <div>
        <AttributeControl node={node} />
      </div>
    );
  }

  static generateBlockDeclarations?(
    options: IGenerationOption<ICustomNodeData>,
  ): string[] {
    const { node, nodeGraph, formatVariableName, formatBlockVarName } = options;

    return [
      `const temp_${formatVariableName(
        node.id,
      )} = context.mount(${formatBlockVarName(node.data.layerId)}, {
        ${node.data.targetPorts
          .map((port) => {
            const sourceId = nodeGraph
              .findSourceNodes(node.id)
              ?.find((item) => item.handleId === port.id)?.relatedHandleId;

            if (!sourceId) {
              return '';
            }

            return `['${port.label}']: ${formatVariableName(sourceId || '')}`;
          })
          .filter(Boolean)
          .join(',\n')}
      })`,
      ...(node.data?.sourcePorts || [])?.map((port) => {
        return `const ${formatVariableName(
          port.id,
        )} = temp_${formatVariableName(node.id)}.output['${port.label}']`;
      }),
    ];
  }

  static generateBlockRelation?(
    options: IGenerationOption<ICustomNodeData>,
  ): string[] {
    return [];
  }
}
