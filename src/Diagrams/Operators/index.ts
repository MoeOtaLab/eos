import { AddOperator } from './AddOperator';
import { SourceOperator } from './SourceOperator';
import { TargetOperator } from './TargetOperator';
import { Operator } from './Operator';

export const OperatorRecord: Record<string, typeof Operator> = {
  AddOperator,
  SourceOperator,
  TargetOperator,
} as any;

export const OperatorMap = new Map<string, typeof Operator>(
  Object.entries(OperatorRecord)
);
