import React from 'react';
import { Operator } from '../Operator';
import { type GraphNode } from '../../Compiler/flowGraph';
import { combineLogic, getState, exportValue } from '../../Compiler/utils';
import { NodePort } from '../../Nodes/types';

/** @deprecated */
export class TargetOperator extends Operator {
  static generateAttributeControl(options: {
    value: TargetOperator;
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
        <label>请选择输出位置</label>
        <input
          value={value.data?.dataSourceId || ''}
          onChange={(e) => { handleChange(e.target.value); }}
        />
      </div>
    );
  }

  constructor(data?: Partial<TargetOperator>) {
    super('TargetOperator', data);

    // init ports
    this.data = {
      ...this.data,
      targetPorts: [
        new NodePort({
          label: 'Target',
          id: 'Target',
        }),
      ],
      dataSourceId: 'input8',
      ...data?.data,
    };
  }

  static generateOperation(node: GraphNode) {
    const item = Object.values(node.sourceLink)[0];
    return combineLogic(
      getState(item.target.id, 'target'),
      exportValue('target')
    );
  }
}
