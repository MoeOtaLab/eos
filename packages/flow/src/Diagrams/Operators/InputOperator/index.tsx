import { MetaOperator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import {
  formatVariableName,
  type IGenerationOption,
} from '../../Compiler/graph';
import { EosCoreSymbol } from '../../Compiler/runtime';
import { type IInputOperatorData, EndPoint } from '../types';

export class InputOperator
  extends MetaOperator<IInputOperatorData>
  implements MetaOperator<IInputOperatorData>
{
  isUnique = true;

  nodeColor = '#5D9C59';

  constructor() {
    super({
      operatorName: 'Input',
      operatorType: 'InputOperator',
      nodeType: NodeTypeEnum.Node,
    });
  }

  create(): Node<IInputOperatorData> {
    return super.create({
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'group',
            label: 'State',
            hint: 'state',
            allowAddAndRemoveChildren: true,
            defaultChildData: {
              type: 'source',
              hint: 'state',
            },
            children: [
              // new EndPoint({
              //   type: 'source',
              //   hint: 'state',
              // }),
            ],
          }),
          new EndPoint({
            type: 'group',
            label: 'Event',
            hint: 'event',
            allowAddAndRemoveChildren: true,
            defaultChildData: {
              type: 'source',
              hint: 'event',
            },
            children: [
              // new EndPoint({
              //   type: 'source',
              //   hint: 'event',
              // }),
            ],
          }),
          new EndPoint({
            type: 'group',
            label: 'Lifecycle',
            hint: 'lifecycle',
            allowAddAndRemoveChildren: false,
            children: [
              new EndPoint({
                type: 'source',
                variableName: 'beforeMount',
              }),
              new EndPoint({
                type: 'source',
                variableName: 'mount',
              }),
              new EndPoint({
                type: 'source',
                variableName: 'beforeUnmount',
              }),
              new EndPoint({
                type: 'source',
                variableName: 'unmount',
              }),
            ],
          }),
        ],
      },
    });
  }

  getEventPorts(node: Node<IInputOperatorData>) {
    const eventPorts =
      node.data?.endPointOptions?.endPointList?.find(
        (item) => item.type === 'group' && item.hint === 'event',
      )?.children || [];

    return eventPorts;
  }

  getStatePort(node: Node<IInputOperatorData>) {
    const statePorts =
      node.data?.endPointOptions?.endPointList?.find(
        (item) => item.type === 'group' && item.hint === 'state',
      )?.children || [];

    return statePorts;
  }

  getLifecyclePorts(node: Node<IInputOperatorData>) {
    const lifecyclePorts =
      node.data?.endPointOptions?.endPointList?.find(
        (item) => item.type === 'group' && item.hint === 'lifecycle',
      )?.children || [];
    return lifecyclePorts;
  }

  generateBlockDeclarations(
    options: IGenerationOption<IInputOperatorData>,
  ): string[] {
    const { node } = options;

    const eventPorts = this.getEventPorts(node);
    const statePorts = this.getStatePort(node);
    const lifecyclePorts = this.getLifecyclePorts(node);

    return [
      ...eventPorts.map(
        (port) =>
          `const ${formatVariableName(port.id)} = input['${
            port.variableName
          }'] || new ${EosCoreSymbol}.ModelEvent()`,
      ),
      ...statePorts.map(
        (port) =>
          `const ${formatVariableName(port.id)} = input['${
            port.variableName
          }'] || new ${EosCoreSymbol}.ModelState(undefined)`,
      ),
      ...lifecyclePorts.map(
        (port) =>
          `const ${formatVariableName(
            port.id,
          )} = new ${EosCoreSymbol}.ModelEvent()`,
      ),
    ];
  }

  generateBlockRelation(
    options: IGenerationOption<IInputOperatorData>,
  ): string[] {
    const { node } = options;

    const lifecyclePorts = this.getLifecyclePorts(node);

    return [
      ...lifecyclePorts.map(
        (port) => `
      context.onLifecycle('${port.variableName}', () => {
        ${formatVariableName(port.id || '')}.next();
      })
    `,
      ),
    ];
  }

  generateBlockOutput(
    options: IGenerationOption<IInputOperatorData>,
  ): string[] {
    const { node } = options;

    const eventPorts = this.getEventPorts(node);

    return eventPorts.map(
      (port) =>
        `['${port.variableName || ''}']: ${formatVariableName(port.id)}`,
    );
  }
}
