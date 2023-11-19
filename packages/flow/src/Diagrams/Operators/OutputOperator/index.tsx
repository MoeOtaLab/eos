import { Operator } from '../Operator';
import { type GraphNode } from '../../Compiler/flowGraph';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import {
  OutputNodePortTypeEnum,
  NodePort,
  type IOutputNodeData,
} from '../../Nodes/types';

export class OutputOperator extends Operator<IOutputNodeData> {
  constructor(data?: Partial<Node<IOutputNodeData>>) {
    super('OutputOperator', {
      ...data,
      type: NodeTypeEnum.OutputNode,
    });

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [],
      targetPorts: [
        new NodePort({
          label: 'data',
          type: OutputNodePortTypeEnum.State,
        }),
        new NodePort({
          label: 'event',
          type: OutputNodePortTypeEnum.Event,
        }),
      ],
      operatorName: 'OutputOperator',
      ...data?.data,
    } as IOutputNodeData;
  }

  static generateAttributeControl(options: {
    value: OutputOperator;
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
