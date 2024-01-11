import { type MetaOperator } from './Operator';
import { type Node } from 'reactflow';
import { type IMetaOperatorData } from './types';

export const OperatorMap = new Map<
  MetaOperator['operatorType'],
  MetaOperator
>();

export function registerOperator(operator: MetaOperator) {
  const currentOperator = OperatorMap.get(operator.operatorType);
  if (currentOperator) {
    if (currentOperator === operator) {
      console.warn(
        `duplicated register: ${operator.operatorType}:${operator.operatorName}`,
      );
    } else {
      console.error(
        `register with same type: ${operator.operatorType}, current: ${currentOperator.operatorName}, next: ${operator.operatorName}`,
        {
          current: currentOperator,
          operator,
        },
      );
    }
  }

  OperatorMap.set(operator.operatorType, operator);
}

export function getOperatorFromOperatorType<T extends MetaOperator>(
  operatorType: string,
) {
  return OperatorMap.get(operatorType) as T | undefined;
}

export function getOperatorFromNode<T extends MetaOperator>(
  node?: Partial<Pick<Node<any>, 'data'>>,
) {
  return getOperatorFromOperatorType<T>(
    (node?.data as IMetaOperatorData)?.operatorType || '',
  );
}
