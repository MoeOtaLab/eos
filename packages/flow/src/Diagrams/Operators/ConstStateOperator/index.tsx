import {
  StateNodePortTypeEnum,
  NodePort,
  type IStateNodeData,
} from '../../Nodes/types';
import { type IGenerationOption } from '../../Compiler/graph';
import { EosOperatorsSymbol } from '../../Compiler/runtime';
import { StateOperator } from '../StateOperator';

export class ConstStateOperator extends StateOperator {
  constructor(data?: Partial<ConstStateOperator>) {
    super();

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [
        new NodePort({
          label: 'data',
          type: StateNodePortTypeEnum.State,
        }),
      ],
      targetPorts: [],
      operatorType: 'ConstStateOperator',
      operatorName: 'ConstStateOperator',
      ...data?.data,
    } as IStateNodeData;
  }

  static generateBlockDeclarations?(
    options: IGenerationOption<IStateNodeData>,
  ): string[] {
    const { node } = options;

    return [
      `const ${ConstStateOperator.getStateSymbol(
        options,
      )} = new ${EosOperatorsSymbol}.constValue(${JSON.stringify(
        node.data.value,
      )})`,
    ];
  }

  static generateBlockRelation?(
    options: IGenerationOption<IStateNodeData>,
  ): string[] {
    return [];
  }
}
