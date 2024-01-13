import { StateOperator, ConstStateOperator } from './StateOperator';
import { InputOperator } from './InputOperator';
import { OutputOperator } from './OutputOperator';
import { SumOperator } from './SumOperator';
import { CustomOperator } from './CustomOperator';

import { registerOperator } from './OperatorMap';

registerOperator(new InputOperator());
registerOperator(new OutputOperator());
registerOperator(new CustomOperator());
registerOperator(new StateOperator());
registerOperator(new ConstStateOperator());
registerOperator(new SumOperator());

export {
  OperatorMap,
  getOperatorFromNode,
  getOperatorFromOperatorType,
} from './OperatorMap';
