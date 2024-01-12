import { StateOperator } from './StateOperator';
import { InputOperator } from './InputOperator';
import { OutputOperator } from './OutputOperator';
import { SumOperator } from './SumOperator';
import { ConstStateOperator } from './ConstStateOperator';
import { type Operator } from './Operator';
import { CustomOperator } from './CustomOperator';
import { WatchOperator } from './WatchOperator';
import { DoOperator } from './DoOperator';

import { registerOperator } from './OperatorMap';

registerOperator(new InputOperator());
registerOperator(new OutputOperator());
registerOperator(new CustomOperator());

export {
  OperatorMap as NextOperatorMap,
  getOperatorFromNode,
  getOperatorFromOperatorType,
} from './OperatorMap';

export const OperatorMap = new Map<string, typeof Operator>(
  Object.entries({
    StateOperator,
    SumOperator,
    ConstStateOperator,
    WatchOperator,
    DoOperator,
  }) as any,
);
