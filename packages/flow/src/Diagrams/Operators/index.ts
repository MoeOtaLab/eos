import { StateOperator } from './StateOperator';
import { InputOperator } from './InputOperator';
import { OutputOperator } from './OutputOperator';
import { SumOperator } from './SumOperator';
import { ConstStateOperator } from './ConstStateOperator';
import { type Operator } from './Operator';
import { CustomOperator } from './CustomOperator';

export const OperatorMap = new Map<string, typeof Operator>(
  [
    ['InputOperator', InputOperator]
    ['OutputOperator', OutputOperator]
    ['StateOperator', StateOperator]
    ['SumOperator', SumOperator]
    ['ConstStateOperator', ConstStateOperator]
    ['CustomOperator', CustomOperator]
  ] as any,
);
