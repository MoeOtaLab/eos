import { type Node } from 'reactflow';
import { type IGenerationOption } from '../../Compiler';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { MetaOperator } from '../MetaOperator';
import { EndPoint, type ICombineOperatorData } from '../types';
import { EosOperatorsSymbol } from '../../Compiler/runtime';

export class CombineOperator
  extends MetaOperator<ICombineOperatorData>
  implements MetaOperator<ICombineOperatorData>
{
  constructor() {
    super({
      operatorName: 'Combine',
      operatorType: 'CombineOperator',
      nodeType: NodeTypeEnum.Node
    });
  }

  nodeColor?: string | undefined = '#C21292';

  create(): Node<ICombineOperatorData<Record<string, any>>> {
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
            hint: 'mainInput',
            label: 'Main Stream',
            defaultChildData: {
              hint: 'mainSource',
              type: 'target'
            },
            allowAddAndRemoveChildren: true,
            children: [
              new EndPoint({
                hint: 'mainSource',
                type: 'target'
              })
            ]
          }),
          new EndPoint({
            type: 'group',
            hint: 'appendInput',
            label: 'Append Stream',
            defaultChildData: {
              hint: 'appendSource',
              type: 'target'
            },
            allowAddAndRemoveChildren: true,
            children: [
              new EndPoint({
                hint: 'appendSource',
                type: 'target'
              })
            ]
          })
        ]
      }
    });
  }

  getHintPorts(node: Node<ICombineOperatorData>, hint: string) {
    return node.data.endPointOptions?.endPointList?.find((item) => item.hint === hint)?.children;
  }

  getMainInputPorts(node: Node<ICombineOperatorData>) {
    return this.getHintPorts(node, 'mainInput');
  }

  getAppendInputPorts(node: Node<ICombineOperatorData>) {
    return this.getHintPorts(node, 'appendInput');
  }

  generateBlockDeclarations(options: IGenerationOption<ICombineOperatorData>): string[] {
    const { node, formatVariableName, nodeGraph } = options;
    const handleId = this.getHintPorts(node, 'output')?.find((item) => item.hint === 'output')?.id || '';

    const mainInputList = this.getMainInputPorts(node)?.map((item) => item.id) || [];

    const appendInputList = this.getAppendInputPorts(node)?.map((item) => item.id) || [];

    const sourceItems = nodeGraph.findSourceNodes(node.id) || [];
    const sourceItemMap = new Map(sourceItems.map((item) => [item.handleId, item]));

    const mainInputSourceIds = mainInputList
      .map((id) => sourceItemMap.get(id))
      .map((item) => item?.relatedHandleId);

    const appendInputSourceIds = appendInputList
      .map((id) => sourceItemMap.get(id))
      .map((item) => item?.relatedHandleId);

    return [
      `const ${formatVariableName(handleId)} = ${EosOperatorsSymbol}.combine(
        [${mainInputSourceIds.map((id) => (id ? formatVariableName(id) : 'undefined')).join(',')}],
        [${appendInputSourceIds.map((id) => (id ? formatVariableName(id) : 'undefined')).join(',')}]
      )`
    ];
  }

  generateBlockOutput(options: IGenerationOption<any>): string[] {
    return [];
  }

  generateBlockRelation(options: IGenerationOption<any>): string[] {
    return [];
  }
}
