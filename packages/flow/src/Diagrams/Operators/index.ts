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

export {
  OperatorMap as NextOperatorMap,
  getOperatorFromNode,
} from './OperatorMap';

export const OperatorMap = new Map<string, typeof Operator>(
  Object.entries({
    OutputOperator,
    StateOperator,
    SumOperator,
    ConstStateOperator,
    CustomOperator,
    WatchOperator,
    DoOperator,
  }) as any,
);
