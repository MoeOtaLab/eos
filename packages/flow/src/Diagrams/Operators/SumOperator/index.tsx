import { MetaOperator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import { type IGenerationOption } from '../../Compiler';
import { type ISumOperatorData, EndPoint } from '../types';
import { EosOperatorsSymbol } from '../../Compiler/runtime';

export class SumOperator
  extends MetaOperator<ISumOperatorData>
  implements MetaOperator<ISumOperatorData>
{
  nodeColor?: string | undefined = '#FF0060';

  constructor() {
    super({
      operatorName: 'Sum',
      operatorType: 'SumOperator',
      nodeType: NodeTypeEnum.Node,
    });
  }

  create(): Node<ISumOperatorData<Record<string, any>>> {
    return super.create({
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'source',
            label: 'output',
            hint: 'output',
          }),
          new EndPoint({
            type: 'group',
            allowAddAndRemoveChildren: true,
            hint: 'input',
            defaultChildData: {
              type: 'target',
              label: 'input',
              hint: 'input',
            },
            children: [
              new EndPoint({
                type: 'target',
                label: 'input',
                hint: 'input',
              }),
              new EndPoint({
                type: 'target',
                label: 'input',
                hint: 'input',
              }),
            ],
          }),
        ],
      },
    });
  }

  generateBlockDeclarations(
    options: IGenerationOption<ISumOperatorData>,
  ): string[] {
    const { node, formatVariableName, nodeGraph } = options;
    const handleId =
      node.data.endPointOptions?.endPointList?.find(
        (item) => item.hint === 'output',
      )?.id || '';

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

  generateBlockRelation(
    options: IGenerationOption<ISumOperatorData>,
  ): string[] {
    return [];
  }

  generateBlockOutput(options: IGenerationOption<any>): string[] {
    return [];
  }
}
