import { Operator } from '../Operator';
import { type GraphNode } from '../../Compiler/flowGraph';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import {
  StateNodePortTypeEnum,
  NodePort,
  type IStateNodeData,
  StateNodeValueTypeEnum,
} from '../../Nodes/types';
import { Form, Input, Select, message } from 'antd';
import { type IAttributeControlOption } from '../types';

function getDefaultValue(valueType: StateNodeValueTypeEnum) {
  switch (valueType) {
    case StateNodeValueTypeEnum.Boolean:
      return false;
    case StateNodeValueTypeEnum.Number:
      return 0;
    case StateNodeValueTypeEnum.String:
      return '';
    case StateNodeValueTypeEnum.Object:
      return '{}';
    default:
      return undefined;
  }
}

export class StateOperator extends Operator<IStateNodeData> {
  constructor(data?: Partial<StateOperator>) {
    super('StateOperator', {
      ...data,
      type: NodeTypeEnum.StateNode,
    });

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [
        new NodePort({
          label: 'data',
          type: StateNodePortTypeEnum.State,
        }),
      ],
      targetPorts: [
        new NodePort({
          label: 'update',
          type: StateNodePortTypeEnum.UpdateHanlder,
        }),
      ],
      operatorName: 'StateOperator',
      value: getDefaultValue(StateNodeValueTypeEnum.Number),
      valueType: StateNodeValueTypeEnum.Number,
      ...data?.data,
    } as IStateNodeData;
  }

  static generateAttributeControl(
    options: IAttributeControlOption<StateOperator>,
  ) {
    const { node, actions } = options;

    return (
      <div>
        <Form.Item label="valueType" colon={false}>
          <Select
            size="small"
            value={node.data.valueType}
            options={[
              {
                value: StateNodeValueTypeEnum.Number,
                label: 'Number',
              },
              {
                value: StateNodeValueTypeEnum.String,
                label: 'String',
              },
              {
                value: StateNodeValueTypeEnum.Boolean,
                label: 'Boolean',
              },
              {
                value: StateNodeValueTypeEnum.Object,
                label: 'Object',
              },
            ]}
            onChange={(value) => {
              actions.updateNode(node.id, (item) => ({
                ...item,
                data: {
                  ...item.data,
                  valueType: value,
                  value: getDefaultValue(value),
                },
              }));
            }}
          ></Select>
        </Form.Item>
        <Form.Item label="value" colon={false}>
          <Input.TextArea
            value={
              [
                StateNodeValueTypeEnum.String,
                StateNodeValueTypeEnum.Object,
              ].includes(node.data.valueType)
                ? (node.data.value as string)
                : JSON.stringify(node.data.value)
            }
            onChange={(event) => {
              let valueWillUpdate = node.data.value;
              const targetValue = event.target.value;

              if (node.data.valueType === StateNodeValueTypeEnum.Object) {
                try {
                  JSON.parse(targetValue);
                  valueWillUpdate = targetValue;
                } catch (error) {
                  message.error('JSON parse error, please check again');
                }
              } else if (
                node.data.valueType === StateNodeValueTypeEnum.Boolean
              ) {
                valueWillUpdate = !!targetValue;
              } else if (
                node.data.valueType === StateNodeValueTypeEnum.Number
              ) {
                valueWillUpdate = Number(targetValue);
              } else {
                valueWillUpdate = targetValue;
              }

              actions.updateNode(node.id, (item) => ({
                ...item,
                data: {
                  ...item?.data,
                  value: valueWillUpdate,
                },
              }));
            }}
          ></Input.TextArea>
        </Form.Item>
      </div>
    );
  }

  static generateOperation(node: GraphNode) {
    // todo
    return '';
  }
}
