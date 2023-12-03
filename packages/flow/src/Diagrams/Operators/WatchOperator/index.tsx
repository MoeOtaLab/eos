import { Operator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import {
  NodePort,
  type IStreamOperatorNodeData,
  type ICustomNodeData,
} from '../../Nodes/types';
import { type IGenerationOption } from '../../Compiler/graph';
import { type IHookOption, type IAttributeControlOption } from '../types';
import { Layer, findLayer } from '../../State/Layer';

export class WatchOperator extends Operator<ICustomNodeData> {
  constructor(data?: Partial<Node<ICustomNodeData>>) {
    super('WatchOperator', {
      ...data,
      type: NodeTypeEnum.ContainerNode,
    });

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [
        new NodePort({
          label: 'output',
        }),
      ],
      targetPorts: [
        new NodePort({
          label: 'input-1',
        }),
        new NodePort({
          label: 'input-2',
        }),
      ],
      operatorName: 'WatchOperator',
      allowAddTargetPort: true,
      ...data?.data,
    } as ICustomNodeData;
  }

  static onAfterCreate(options: IHookOption<WatchOperator>) {
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
  }

  static generateAttributeControl(
    options: IAttributeControlOption<WatchOperator>,
  ) {
    return <div>empty</div>;
  }

  static generateBlockDeclarations?(
    options: IGenerationOption<IStreamOperatorNodeData>,
  ): string[] {
    return [];
  }

  static generateBlockRelation?(
    options: IGenerationOption<IStreamOperatorNodeData>,
  ): string[] {
    return [];
  }
}
