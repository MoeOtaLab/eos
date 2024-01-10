import React, { type DragEventHandler } from 'react';
import { OperatorMap, NextOperatorMap } from '../../Operators';
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
        {[...OperatorMap.entries()].map(([name, Operator]) => {
          return (
            <div
              key={name}
              className={css['operator-item']}
              draggable={true}
              onDragStart={handleDragStart(OPERATOR_TYPE_DATA, name)}
            >
              {name}
            </div>
          );
        })}
        {[...NextOperatorMap.entries()].map(([name, operator]) => {
          return (
            <div
              key={name}
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
