import { Operator } from '../Operator';
import { type GraphNode } from '../../Compiler/flowGraph';
import { combineLogic, exportValue } from '../../Compiler/utils';
import { NodePort } from '../../Nodes/types';

/** @deprecated */
export class SourceOperator extends Operator {
  static generateAttributeControl(options: {
    value: SourceOperator;
    actions: {
      updateElement: any;
    };
  }) {
    const { value, actions } = options;

    function handleChange(val: string) {
      value.data.dataSourceId = val;
      actions.updateElement(value.id, value);
    }

    return (
      <div>
        {super.generateAttributeControl(options)}
        <label>请选择数据来源</label>
        <input
          value={value.data?.dataSourceId || ''}
          onChange={(e) => { handleChange(e.target.value); }}
        />
      </div>
    );
  }

  constructor(data?: Partial<SourceOperator>) {
    super('SourceOperator', data);

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [
        new NodePort({
          label: 'Source',
          id: 'Source',
        }),
      ],
      ...data?.data,
    };
  }

  static generateOperation(node: GraphNode) {
    return combineLogic(
      `const result = link.getValueSource('${node.operator.data.dataSourceId}');`,
      `console.log({result, type: '${node.operator.data.dataSourceId}'})`,
      exportValue('result')
    );
  }
}
