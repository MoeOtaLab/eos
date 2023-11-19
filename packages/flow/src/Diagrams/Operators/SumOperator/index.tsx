import { Operator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import { NodePort, type IStreamOperatorNodeData } from '../../Nodes/types';
import { type IGenerationOption } from '../../Compiler/graph';
import { type IAttributeControlOption } from '../types';
import { EosCoreSymbol, EosOperatorsSymbol } from '../../Compiler/runtime';

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
    const { node, formatVariableName } = options;
    const handleId = node.data.sourcePorts[0].id;

    return [
      `const ${formatVariableName(
        handleId,
      )} = new ${EosCoreSymbol}.ModelState()`,
    ];
  }

  static generateBlockRelation?(
    options: IGenerationOption<IStreamOperatorNodeData>,
  ): string[] {
    const { node, nodeGraph, formatVariableName } = options;
    const handleId = node.data.sourcePorts[0].id;
    const sourceIds = nodeGraph
      .findSourceNodes(node.id)
      ?.map((item) => item.relatedHandleId);

    if (!sourceIds?.length) {
      return [];
    }

    return [
      `let temp_${formatVariableName(
        handleId,
      )} = ${EosOperatorsSymbol}.sum(${sourceIds
        .map((id) => formatVariableName(id))
        .join(',')})`,
      `temp_${formatVariableName(handleId)}.subscribe((value, extraInfo) => {
          ${formatVariableName(handleId)}.update(value, extraInfo.concat('${
            node.id
          }'))
        })`,
      `${formatVariableName(handleId)}.update(temp_${formatVariableName(
        handleId,
      )}.current, new ${EosCoreSymbol}.ExtraInfo('[sum] init'))`,
    ];
  }

  static generateBlockOutput?(
    options: IGenerationOption<IStreamOperatorNodeData>,
  ): string[] {
    return [];
  }
}
