import { StateOperator, ConstStateOperator } from './StateOperator';
import { InputOperator } from './InputOperator';
import { OutputOperator } from './OutputOperator';
import { SumOperator } from './SumOperator';
import { GroupOperator } from './GroupOperator';
import { CombineOperator } from './CombineOperator';
import { TransformOperator, EffectOperator } from './TransformOperator';
import { MergeOperator } from './MergeOperator';
import { ConditionModelOperator } from './ConditionModelOperator';

import { registerOperators } from './OperatorMap';

registerOperators([
  new InputOperator(),
  new OutputOperator(),
  new GroupOperator(),
  new StateOperator(),
  new ConstStateOperator(),
  new SumOperator(),
  new CombineOperator(),
  new TransformOperator(),
  new EffectOperator(),
  new MergeOperator(),
  new ConditionModelOperator()
]);

export {
  getOperatorFromNode,
  getOperatorFromOperatorType,
  getAllOperators,
  registerOperators
} from './OperatorMap';
