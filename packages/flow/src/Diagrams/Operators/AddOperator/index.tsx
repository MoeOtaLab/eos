import { Operator } from '../Operator';
import css from './AddOperator.module.less';
import { type GraphNode } from '../../Compiler/flowGraph';
import {
  getState,
  combineLogic,
  generateArray,
  generateFunction,
  exportValue,
} from '../../Compiler/utils';
import { NodePort } from '../../Nodes/types';

/** @deprecated */
export class AddOperator extends Operator {
  constructor(data?: Partial<AddOperator>) {
    super('AddOperator', data);

    // init ports
    this.data = {
      ...this.data,
      targetPorts: [
        new NodePort({
          label: 'Input_1',
          id: 'Input_1',
        }),
        new NodePort({
          label: 'Input_2',
          id: 'Input_2',
        }),
      ],
      sourcePorts: [
        new NodePort({
          label: 'Result',
          id: 'Result',
        }),
      ],
      ...data?.data,
    };
  }

  static generateAttributeControl(options: {
    value: AddOperator;
    actions: {
      updateElement: any;
    };
  }) {
    const { value: instance, actions } = options;
    const targetPorts = instance.data.targetPorts || [];

    const addInputPort = () => {
      const newInputPort: NonNullable<AddOperator['data']['sourcePorts']>['0'] =
        new NodePort({
          label: `Input_${targetPorts.length + 1}`,
          id: `Input_${targetPorts.length + 1}`,
        });
      instance.data.targetPorts = targetPorts.concat(newInputPort);
      actions.updateElement(instance.id, instance, true);
    };

    const deleteInputPort = () => {
      if (targetPorts.length > 1) {
        instance.data.targetPorts?.pop();
        actions.updateElement(instance.id, instance, true);
      }
    };

    return (
      <div className={css['attribute-control']}>
        {Operator.generateAttributeControl(options)}
        <button onClick={addInputPort}>add Input Port</button>
        <button disabled={targetPorts.length <= 1} onClick={deleteInputPort}>
          delete Input Port
        </button>
      </div>
    );
  }

  static generateOperation(node: GraphNode) {
    const sourceLinks = Object.entries(node.sourceLink);

    const output = combineLogic(
      // declare
      sourceLinks.map(([targetName, link]) =>
        getState(link.target.id, targetName)),
      // run
      generateFunction(
        'operations.AddOperator.addOperation',
        'addResult$',
        generateArray(sourceLinks.map(([targetName]) => targetName)),
        generateArray(sourceLinks.map(([, link]) => `'${link.handler}'`))
      ),
      exportValue('addResult$')
    );

    console.log(output);
    return output;
  }
}
