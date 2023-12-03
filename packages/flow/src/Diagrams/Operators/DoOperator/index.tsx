import { Operator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import { NodePort, type IStreamOperatorNodeData } from '../../Nodes/types';
import { type IGenerationOption } from '../../Compiler/graph';
import { type IAttributeControlOption } from '../types';

export class DoOperator extends Operator<IStreamOperatorNodeData> {
  constructor(data?: Partial<Node<IStreamOperatorNodeData>>) {
    super('DoOperator', {
      ...data,
      type: NodeTypeEnum.DoNode,
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
      operatorName: 'DoOperator',
      allowAddTargetPort: true,
      ...data?.data,
    } as IStreamOperatorNodeData;
  }

  static generateAttributeControl(
    options: IAttributeControlOption<DoOperator>,
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
