import { Operator } from '../Operator';
import { type GraphNode } from '../../Compiler/flowGraph';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import {
  InputNodePortTypeEnum,
  NodePort,
  type IInputNodeData,
} from '../../Nodes/types';

export class InputOperator extends Operator<IInputNodeData> {
  constructor(data?: Partial<Node<IInputNodeData>>) {
    super('InputOperator', {
      ...data,
      type: NodeTypeEnum.InputNode,
    });

    this.unique = true;

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [
        new NodePort({
          label: 'state',
          type: InputNodePortTypeEnum.State,
        }),

        new NodePort({
          label: 'event',
          type: InputNodePortTypeEnum.Event,
        }),

        new NodePort({
          label: 'beforeMount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
        new NodePort({
          label: 'mount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
        new NodePort({
          label: 'beforeUnmount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
        new NodePort({
          label: 'unmount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
      ],
      targetPorts: [],
      operatorName: 'InputOperator',
      ...data?.data,
    } as IInputNodeData;
  }

  static generateAttributeControl(options: {
    value: InputOperator;
    actions: {
      updateElement: any;
    };
  }) {
    return <div>empty</div>;
  }

  static generateOperation(node: GraphNode) {
    // todo
    return '';
  }
}
