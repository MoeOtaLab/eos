import { Operator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import {
  InputNodePortTypeEnum,
  NodePort,
  type IInputNodeData,
} from '../../Nodes/types';
import {
  formatVariableName,
  type IGenerationOption,
} from '../../Compiler/graph';
import { EosCoreSymbol } from '../../Compiler/runtime';
import { type IAttributeControlOption } from '../types';

export class InputOperator extends Operator<IInputNodeData> {
  constructor(data?: Partial<Node<IInputNodeData>>) {
    super('InputOperator', {
      ...data,
      type: NodeTypeEnum.InputNode,
    });

    this.unique = true;

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [
        new NodePort({
          label: 'state',
          type: InputNodePortTypeEnum.State,
        }),

        new NodePort({
          label: 'input-event',
          type: InputNodePortTypeEnum.Event,
        }),

        new NodePort({
          label: 'beforeMount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
        new NodePort({
          label: 'mount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
        new NodePort({
          label: 'beforeUnmount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
        new NodePort({
          label: 'unmount',
          type: InputNodePortTypeEnum.LifeCycle,
        }),
      ],
      targetPorts: [],
      operatorName: 'InputOperator',
      ...data?.data,
    } as IInputNodeData;
  }

  static generateAttributeControl(
    options: IAttributeControlOption<Operator<any>>,
  ) {
    return <div>empty</div>;
  }

  static generateBlockDeclarations?(
    options: IGenerationOption<IInputNodeData>,
  ): string[] {
    const { node } = options;

    const eventPorts = node.data.sourcePorts.filter(
      (port) => port.type === InputNodePortTypeEnum.Event,
    );

    const statePorts = node.data.sourcePorts.filter(
      (port) => port.type === InputNodePortTypeEnum.State,
    );

    const lifecyclePorts = node.data.sourcePorts.filter(
      (port) => port.type === InputNodePortTypeEnum.LifeCycle,
    );

    return [
      ...eventPorts.map(
        (port) =>
          `const ${formatVariableName(port.id)} = input['${
            port.label
          }'] || new ${EosCoreSymbol}.ModelEvent()`,
      ),
      ...statePorts.map(
        (port) =>
          `const ${formatVariableName(port.id)} = input['${port.label}']`,
      ),
      ...lifecyclePorts.map(
        (port) =>
          `const ${formatVariableName(
            port.id,
          )} = new ${EosCoreSymbol}.ModelEvent()`,
      ),
    ];
  }

  static generateBlockRelation?(
    options: IGenerationOption<IInputNodeData>,
  ): string[] {
    const { node } = options;

    const lifecyclePorts = node.data.sourcePorts.filter(
      (port) => port.type === InputNodePortTypeEnum.LifeCycle,
    );

    return [
      ...lifecyclePorts.map(
        (port) => `
      context.onLifecycle('${port.label}', () => {
        ${formatVariableName(port.id)}.next();
      })
    `,
      ),
    ];
  }

  static generateBlockOutput?(
    options: IGenerationOption<IInputNodeData>,
  ): string[] {
    const { node } = options;

    const eventPorts = node.data.sourcePorts.filter(
      (port) => port.type === InputNodePortTypeEnum.Event,
    );

    return eventPorts.map(
      (port) => `['${port.label}']: ${formatVariableName(port.id)}`,
    );
  }
}
