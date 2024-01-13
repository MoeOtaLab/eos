import { StateOperator, ConstStateOperator } from './StateOperator';
import { InputOperator } from './InputOperator';
import { OutputOperator } from './OutputOperator';
import { SumOperator } from './SumOperator';
import { type Operator } from './Operator';
import { CustomOperator } from './CustomOperator';
import { WatchOperator } from './WatchOperator';
import { DoOperator } from './DoOperator';

import { registerOperator } from './OperatorMap';

registerOperator(new InputOperator());
registerOperator(new OutputOperator());
registerOperator(new CustomOperator());
registerOperator(new StateOperator());
registerOperator(new ConstStateOperator());

export {
  OperatorMap as NextOperatorMap,
  getOperatorFromNode,
  getOperatorFromOperatorType,
} from './OperatorMap';

export const OperatorMap = new Map<string, typeof Operator>(
  Object.entries({
    SumOperator,
    WatchOperator,
    DoOperator,
  }) as any,
);
