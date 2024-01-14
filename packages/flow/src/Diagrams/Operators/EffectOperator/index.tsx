import { type Node } from 'reactflow';
import { type IGenerationOption } from '../../Compiler/graph';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { MetaOperator } from '../Operator';
import { EndPoint, type IEffectOperatorData } from '../types';

export class EffectOperator
  extends MetaOperator<IEffectOperatorData>
  implements MetaOperator<IEffectOperatorData>
{
  constructor() {
    super({
      operatorName: 'Effect',
      operatorType: 'EffectOperator',
      nodeType: NodeTypeEnum.Node,
    });
  }

  create(): Node<IEffectOperatorData<Record<string, any>>> {
    return super.create({
      endPointOptions: {
        endPointList: [
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
