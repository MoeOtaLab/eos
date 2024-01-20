import React, { type DragEventHandler } from 'react';
import { getAllOperators } from '../../Operators';
import css from './OperatorPanel.module.less';

export const OPERATOR_TYPE_DATA = 'operator_type';

type DragEventGenerator = (key: string, value: string) => DragEventHandler;

export const OperatorPanel: React.FC = () => {
  const handleDragStart: DragEventGenerator = (key, value) => (event) => {
    console.log('233 handleDragStart', key, value);
    event.dataTransfer.setData(key, value);
    event.dataTransfer.dropEffect = 'copy';
    event.dataTransfer.effectAllowed = 'all';
  };

  return (
    <div className={css.container}>
      <div className={css.title}>Operators</div>
      <div className={css.content}>
        {getAllOperators().map((operator) => {
          return (
            <div
              key={operator.operatorType}
              className={css['operator-item']}
              draggable={true}
              onDragStart={handleDragStart(
                OPERATOR_TYPE_DATA,
                operator.operatorType,
              )}
            >
              {operator.operatorName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
