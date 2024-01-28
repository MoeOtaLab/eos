import { type IGenerationOption } from '../../Compiler';
import { EosOperatorsSymbol } from '../../Compiler/runtime';
import { StateOperator } from '.';
import { type MetaOperator } from '../Operator';
import { EndPoint, type IStateOperatorData } from '../types';
import { type Node } from 'reactflow';

export class ConstStateOperator extends StateOperator implements MetaOperator {
  constructor() {
    super();
    this.defaultOperatorData.operatorName = 'ConstState';
    this.defaultOperatorData.operatorType = 'ConstStateOperator';
  }

  create(): Node<IStateOperatorData<Record<string, any>>> {
    const newNode = super.create();
    const node = this.updateData(newNode, {
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'source',
            label: 'data',
            hint: 'data'
          })
        ]
      }
    });

    return node;
  }

  generateBlockDeclarations(options: IGenerationOption<IStateOperatorData>): string[] {
    const { node } = options;

    return [
      `const ${super.getStateSymbol(options)} = new ${EosOperatorsSymbol}.constValue(${JSON.stringify(
        node.data.value
      )})`
    ];
  }

  generateBlockRelation(options: IGenerationOption<IStateOperatorData>): string[] {
    return [];
  }
}
