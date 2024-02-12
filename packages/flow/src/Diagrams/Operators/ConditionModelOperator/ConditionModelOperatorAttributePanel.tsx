import { IAttributeControlOption, IConditionModelOperatorData } from '../types';
import { Node } from 'reactflow';
import { Input, Form, message } from 'antd';
import { ConditionModelOperator } from '.';
import { DragEventHandler } from 'react';
import { OPERATOR_TYPE_DATA } from '../../Panels/OperatorPanel';
import { getOperatorFromOperatorType } from '../OperatorMap';

export function ConditionModelOperatorAttributePanel(props: {
  options: IAttributeControlOption<Node<IConditionModelOperatorData<Record<string, any>>>>;
  operator: ConditionModelOperator;
}) {
  const {
    options: { actions, node },
    operator
  } = props;

  const handleDrop: DragEventHandler = (event) => {
    const operatorType = event.dataTransfer.getData(OPERATOR_TYPE_DATA);
    if (operatorType) {
      if (getOperatorFromOperatorType(operatorType)?.isUnique) {
        message.info('not support unique operator');
        return;
      }

      actions.updateNode(
        node.id,
        operator.updateData(node, {
          modelOperatorType: operatorType || ''
        })
      );
    }
  };

  const handleDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes(OPERATOR_TYPE_DATA)) {
      event.preventDefault();
    }
  };

  const modelOperatorType = node?.data?.modelOperatorType;
  const modelOperator = getOperatorFromOperatorType(modelOperatorType);

  return (
    <>
      <Form.Item
        label="model(drag from operators)"
        help={modelOperator ? `operatorName: ${modelOperator.operatorName}` : undefined}
      >
        <div onDrop={handleDrop} onDragEnter={handleDragOver} onDragOver={handleDragOver}>
          <Input value={node?.data?.modelOperatorType} readOnly={true} />
        </div>
      </Form.Item>
    </>
  );
}
