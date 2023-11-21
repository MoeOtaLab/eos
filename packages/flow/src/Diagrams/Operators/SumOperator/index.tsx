import { Operator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import { NodePort, type IStreamOperatorNodeData } from '../../Nodes/types';
import { type IGenerationOption } from '../../Compiler/graph';
import { type IAttributeControlOption } from '../types';
import { EosOperatorsSymbol } from '../../Compiler/runtime';

export class SumOperator extends Operator<IStreamOperatorNodeData> {
  constructor(data?: Partial<Node<IStreamOperatorNodeData>>) {
    super('SumOperator', {
      ...data,
      type: NodeTypeEnum.StreamOperatorNode,
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
      operatorName: 'SumOperator',
      allowAddTargetPort: true,
      ...data?.data,
    } as IStreamOperatorNodeData;
  }

  static generateAttributeControl(
    options: IAttributeControlOption<SumOperator>,
  ) {
    return <div>empty</div>;
  }

  static generateBlockDeclarations?(
    options: IGenerationOption<IStreamOperatorNodeData>,
  ): string[] {
    const { node, formatVariableName, nodeGraph } = options;
    const handleId = node.data.sourcePorts[0].id;

    const sourceIds =
      nodeGraph.findSourceNodes(node.id)?.map((item) => item.relatedHandleId) ||
      [];

    return [
      `const ${formatVariableName(
        handleId,
      )} = ${EosOperatorsSymbol}.sum(${sourceIds
        .map((id) => formatVariableName(id))
        .join(',')})`,
    ];
  }

  static generateBlockRelation?(
    options: IGenerationOption<IStreamOperatorNodeData>,
  ): string[] {
    return [];
  }
}
