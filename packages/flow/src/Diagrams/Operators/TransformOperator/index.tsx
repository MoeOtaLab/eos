import { type Node } from 'reactflow';
import { type IGenerationOption } from '../../Compiler/graph';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { MetaOperator } from '../Operator';
import { EndPoint, type ITranformOperatorData } from '../types';

export class TransformOperator
  extends MetaOperator<ITranformOperatorData>
  implements MetaOperator<ITranformOperatorData>
{
  constructor() {
    super({
      operatorName: 'Transform',
      operatorType: 'TransformOperator',
      nodeType: NodeTypeEnum.Node,
    });
  }

  create(): Node<ITranformOperatorData<Record<string, any>>> {
    return super.create({
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'source',
            hint: 'output',
            label: 'output',
          }),
          new EndPoint({
            type: 'target',
            hint: 'input',
            label: 'input',
          }),
        ],
      },
    });
  }

  nodeColor?: string | undefined = '#F3F8FF';

  generateBlockDeclarations(options: IGenerationOption<any>): string[] {
    return [];
  }

  generateBlockOutput(options: IGenerationOption<any>): string[] {
    return [];
  }

  generateBlockRelation(options: IGenerationOption<any>): string[] {
    return [];
  }
}
