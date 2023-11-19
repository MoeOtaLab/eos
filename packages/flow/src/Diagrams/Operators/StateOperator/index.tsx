import { Operator } from '../Operator';
import { type GraphNode } from '../../Compiler/flowGraph';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import {
  StateNodePortTypeEnum,
  NodePort,
  type IStateNodeData,
} from '../../Nodes/types';

export class StateOperator extends Operator<IStateNodeData> {
  constructor(data?: Partial<StateOperator>) {
    super('StateOperator', {
      ...data,
      type: NodeTypeEnum.StateNode,
    });

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [
        new NodePort({
          label: 'data',
          type: StateNodePortTypeEnum.State,
        }),
      ],
      targetPorts: [
        new NodePort({
          label: 'update',
          type: StateNodePortTypeEnum.UpdateHanlder,
        }),
      ],
      operatorName: 'StateOperator',
      ...data?.data,
    } as IStateNodeData;
  }

  static generateAttributeControl(options: {
    value: StateOperator;
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
