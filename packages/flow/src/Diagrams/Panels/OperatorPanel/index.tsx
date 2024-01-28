import React, { type DragEventHandler } from 'react';
import { useOperators } from '../../State/OperatorProvider';
import { CustomOperator } from '../../Operators/CustomOperator';
import { registerOperators } from '../../Operators';
import css from './OperatorPanel.module.less';
import { Button, Input, type InputRef, Modal, message } from 'antd';

export const OPERATOR_TYPE_DATA = 'operator_type';

type DragEventGenerator = (key: string, value: string) => DragEventHandler;

export const OperatorPanel: React.FC = () => {
  const handleDragStart: DragEventGenerator = (key, value) => (event) => {
    event.dataTransfer.setData(key, value);
    event.dataTransfer.dropEffect = 'copy';
    event.dataTransfer.effectAllowed = 'all';
  };

  const { operators, refreshOperators } = useOperators();

  return (
    <div className={css.container}>
      <div className={css.title}>Operators</div>
      <div className={css.content}>
        <Button
          size="small"
          type="link"
          onClick={() => {
            let name = '';
            function addCustomOperator() {
              if (!name) {
                message.warning('Please input name');
                return;
              }

              const customOperator = new CustomOperator(name);
              registerOperators([customOperator]);
              refreshOperators();
            }
            let inputRef: InputRef | undefined | null;
            const instance = Modal.info({
              title: 'Custom Operator Name',
              content: (
                <div>
                  <Input
                    ref={(ref) => {
                      inputRef = ref;
                    }}
                    onChange={(e) => {
                      name = e.target.value || '';
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        instance.destroy();
                        addCustomOperator();
                      }
                    }}
                  />
                </div>
              ),
              onOk() {
                addCustomOperator();
              }
            });

            setTimeout(() => {
              console.log('inputRef', inputRef);
              inputRef?.input?.focus();
            }, 200);
          }}
        >
          Add Custom
        </Button>
        {operators.map((operator) => {
          return (
            <div
              key={operator.operatorType}
              className={css['operator-item']}
              draggable={true}
              onDragStart={handleDragStart(OPERATOR_TYPE_DATA, operator.operatorType)}
            >
              {operator.isCustom ? 'Custom:' : ''}
              {operator.operatorName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
