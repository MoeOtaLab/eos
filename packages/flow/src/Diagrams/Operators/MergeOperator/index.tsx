import { type Node } from 'reactflow';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { MetaOperator } from '../Operator';
import { EndPoint, type IMergeOperatorData } from '../types';
import { type IGenerationOption } from '../../Compiler';
import { EosCoreSymbol, EosOperatorsSymbol } from '../../Compiler/runtime';

export class MergeOperator
  extends MetaOperator<IMergeOperatorData>
  implements MetaOperator<IMergeOperatorData>
{
  nodeColor?: string | undefined = '#C21292';

  constructor() {
    super({
      operatorName: 'Merge',
      operatorType: 'MergeOperator',
      nodeType: NodeTypeEnum.Node
    });
  }

  create(): Node<IMergeOperatorData<Record<string, any>>> {
    return super.create({
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'group',
            hint: 'output',
            children: [
              new EndPoint({
                label: 'output',
                hint: 'output',
                variableType: 'array',
                type: 'source'
              })
            ]
          }),
          new EndPoint({
            type: 'group',
            hint: 'input',
            label: 'Stream',
            defaultChildData: {
              hint: 'input',
              type: 'target',
              ignoreDegree: true
            },
            allowAddAndRemoveChildren: true,
            children: [
              new EndPoint({
                hint: 'input',
                type: 'target',
                ignoreDegree: true
              })
            ]
          })
        ]
      }
    });
  }

  getHintPorts(node: Node<IMergeOperatorData>, hint: string) {
    return node.data.endPointOptions?.endPointList?.find((item) => item.hint === hint)?.children;
  }

  getIgnoreDegreeIds(node: Node<IMergeOperatorData<Record<string, any>>>): string[] {
    const mainInputList = this.getHintPorts(node, 'input')?.map((item) => item.id) || [];
    return mainInputList;
  }

  generateBlockDeclarations(options: IGenerationOption<IMergeOperatorData<Record<string, any>>>): string[] {
    const { node, formatVariableName } = options;

    const handleId = this.getHintPorts(node, 'output')?.find((item) => item.hint === 'output')?.id || '';

    const mainInputList = this.getHintPorts(node, 'input')?.map((item) => item.id) || [];
    return [
      ...mainInputList.map(
        (inputId) => `const ${formatVariableName(inputId)} = new ${EosCoreSymbol}.ModelState(undefined)`
      ),
      `const ${formatVariableName(handleId)} = ${EosOperatorsSymbol}.merge(
        [${mainInputList.map((id) => formatVariableName(id)).join(',')}],
      )`
    ];
  }

  generateBlockOutput(options: IGenerationOption<IMergeOperatorData<Record<string, any>>>): string[] {
    return [];
  }

  generateBlockRelation(options: IGenerationOption<IMergeOperatorData<Record<string, any>>>): string[] {
    const { node, formatVariableName, nodeGraph } = options;

    const mainInputList = this.getHintPorts(node, 'input')?.map((item) => item.id) || [];

    const sourceItems = nodeGraph.findSourceNodes(node.id) || [];
    const sourceItemMap = new Map(sourceItems.map((item) => [item.handleId, item]));

    const relationList = mainInputList
      .map((inputId) => ({
        inputId,
        targetId: sourceItemMap.get(inputId)?.relatedHandleId || ''
      }))
      .filter((item) => item.inputId && item.targetId);

    return [
      ...relationList.map(
        ({ inputId, targetId }) => `${formatVariableName(targetId)}.subscribe((action) => {
          ${formatVariableName(inputId)}.next(action.concat({
            payload: action.payload,
            path: '${JSON.stringify({
              currentNodeId: node.id,
              fromPortId: targetId,
              toPortId: inputId
            })}'
          }));
        });`
      )
    ];
  }
}
