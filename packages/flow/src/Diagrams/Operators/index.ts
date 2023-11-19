// import { AddOperator } from './AddOperator';
// import { SourceOperator } from './SourceOperator';
// import { TargetOperator } from './TargetOperator';
import { StateOperator } from './StateOperator';
import { InputOperator } from './InputOperator';
import { OutputOperator } from './OutputOperator';
import { SumOperator } from './SumOperator';
import { ConstStateOperator } from './ConstStateOperator';
import { type Operator } from './Operator';

export const OperatorRecord: Record<string, typeof Operator> = {
  // AddOperator,
  // SourceOperator,
  // TargetOperator,
  InputOperator,
  OutputOperator,
  StateOperator,
  SumOperator,
  ConstStateOperator,
} as any;

export const OperatorMap = new Map<string, typeof Operator>(
  Object.entries(OperatorRecord),
);
