import { AddOperator } from './AddOperator';
import { SourceOperator } from './SourceOperator';
import { TargetOperator } from './TargetOperator';
import { StateOperator } from './StateOperator';
import { type Operator } from './Operator';

export const OperatorRecord: Record<string, typeof Operator> = {
  AddOperator,
  SourceOperator,
  TargetOperator,
  StateOperator,
} as any;

export const OperatorMap = new Map<string, typeof Operator>(Object.entries(OperatorRecord));
