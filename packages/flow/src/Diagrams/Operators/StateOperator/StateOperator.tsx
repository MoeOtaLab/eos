import { MetaOperator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { Form, Input, Select, message } from 'antd';
import {
  type IStateOperatorData,
  type IAttributeControlOption,
  StateOperatorValueTypeEnum,
  EndPoint,
} from '../types';
import { type IGenerationOption } from '../../Compiler/graph';
import { EosCoreSymbol } from '../../Compiler/runtime';
import { type NodeProps, type Node } from 'reactflow';
import { type INodeProps } from '../../Nodes/Node';

function getDefaultValue(valueType: StateOperatorValueTypeEnum) {
  switch (valueType) {
    case StateOperatorValueTypeEnum.Boolean:
      return false;
    case StateOperatorValueTypeEnum.Number:
      return 0;
    case StateOperatorValueTypeEnum.String:
      return '';
    case StateOperatorValueTypeEnum.Object:
      return '{}';
    default:
      return undefined;
  }
}

export class StateOperator
  extends MetaOperator<IStateOperatorData>
  implements MetaOperator<IStateOperatorData>
{
  nodeColor?: string | undefined = '#0079FF';

  constructor() {
    super({
      operatorName: 'State',
      operatorType: 'StateOperator',
      nodeType: NodeTypeEnum.Node,
    });
  }

  create(): Node<IStateOperatorData> {
    return super.create({
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'source',
            label: 'data',
            hint: 'data',
          }),
          new EndPoint({
            type: 'target',
            label: 'update',
            hint: 'update',
          }),
        ],
      },
      value: 0,
      valueType: StateOperatorValueTypeEnum.Number,
    });
  }

  getStateSymbol(options: IGenerationOption<IStateOperatorData>) {
    const { node, formatVariableName } = options;
    return formatVariableName(
      node.data.endPointOptions?.endPointList?.find(
        (item) => item.type === 'source' && item.hint === 'data',
      )?.id || '',
    );
  }

  generateBlockDeclarations(
    options: IGenerationOption<IStateOperatorData>,
  ): string[] {
    const { node } = options;

    return [
      `const ${this.getStateSymbol(
        options,
      )} = new ${EosCoreSymbol}.ModelState(${JSON.stringify(node.data.value)})`,
    ];
  }

  generateBlockOutput(
    options: IGenerationOption<IStateOperatorData>,
  ): string[] {
    return [];
  }

  generateBlockRelation(
    options: IGenerationOption<IStateOperatorData>,
  ): string[] {
    const { node, formatVariableName, nodeGraph } = options;

    const sources = nodeGraph.findSourceNodes(node.id) || [];

    return [
      ...sources?.map(
        (item) => `
          ${formatVariableName(
            item.relatedHandleId,
          )}.subscribe((val, extraInfo) => {
            ${this.getStateSymbol(options)}.update(val, extraInfo.concat('${
              item.nodeId
            }'));
          });`,
      ),
    ];
  }

  generateAttributeControl(
    options: IAttributeControlOption<Node<IStateOperatorData>>,
  ): JSX.Element {
    const { node, actions } = options;

    return (
      <div>
        <Form.Item label="valueType" colon={false}>
          <Select
            size="small"
            value={node.data.valueType}
            options={[
              {
                value: StateOperatorValueTypeEnum.Number,
                label: 'Number',
              },
              {
                value: StateOperatorValueTypeEnum.String,
                label: 'String',
              },
              {
                value: StateOperatorValueTypeEnum.Boolean,
                label: 'Boolean',
              },
              {
                value: StateOperatorValueTypeEnum.Object,
                label: 'Object',
              },
            ]}
            onChange={(value) => {
              actions.updateNode(node.id, (item) =>
                this.updateData(item, {
                  valueType: value,
                  value: getDefaultValue(value),
                }),
              );
            }}
          ></Select>
        </Form.Item>
        <Form.Item label="value" colon={false}>
          <Input.TextArea
            value={
              [
                StateOperatorValueTypeEnum.String,
                StateOperatorValueTypeEnum.Object,
              ].includes(node.data.valueType)
                ? (node.data.value as string)
                : JSON.stringify(node.data.value)
            }
            onChange={(event) => {
              let valueWillUpdate = node.data.value;
              const targetValue = event.target.value;

              if (node.data.valueType === StateOperatorValueTypeEnum.Object) {
                try {
                  JSON.parse(targetValue);
                  valueWillUpdate = targetValue;
                } catch (error) {
                  message.error('JSON parse error, please check again');
                }
              } else if (
                node.data.valueType === StateOperatorValueTypeEnum.Boolean
              ) {
                valueWillUpdate = !!targetValue;
              } else if (
                node.data.valueType === StateOperatorValueTypeEnum.Number
              ) {
                valueWillUpdate = Number(targetValue);
              } else {
                valueWillUpdate = targetValue;
              }

              actions.updateNode(node.id, (item) =>
                this.updateData(item, {
                  value: valueWillUpdate,
                }),
              );
            }}
          ></Input.TextArea>
        </Form.Item>
      </div>
    );
  }

  getNodeProps(
    currentNode: NodeProps<IStateOperatorData<Record<string, any>>>,
  ): INodeProps {
    const { data } = currentNode;
    return {
      showValue: true,
      getBriefValue() {
        return {
          value:
            data.valueType === StateOperatorValueTypeEnum.Object
              ? 'Object(click to view)'
              : JSON.stringify(data.value),
          hasDetail: data.valueType === StateOperatorValueTypeEnum.Object,
        };
      },
      getDetailValue() {
        return JSON.stringify(data.value, undefined, 2);
      },
    };
  }
}
