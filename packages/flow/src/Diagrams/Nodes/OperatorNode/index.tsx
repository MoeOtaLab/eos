import React from 'react';
import classnames from 'classnames';
import { type NodeComponentProps } from 'reactflow';
import { PortList } from './PortList';
import { type OperatorNodeData, type Operator } from '../../Operators/Operator';
import css from './OperatorNode.module.less';

export type OperatorNodeProps = NodeComponentProps<OperatorNodeData> & Operator;

export const OperatorNode: React.FC<OperatorNodeProps> = (props) => {
  const { data, selected } = props;
  const operatorType = data?.operatorType;

  const ports = [
    {
      type: 'source' as const,
      value: data.sourcePorts,
    },
    {
      type: 'target' as const,
      value: data.targetPorts,
    },
  ];

  return (
    <div
      className={classnames(css.node__container, {
        [css['is-selected']]: selected,
      })}
    >
      {operatorType}
      <div className={css.node__content}>
        <div className={css.node__title}>{data.label}</div>
        {ports?.map(({ type, value }) => {
          if (!value?.length) {
            return null;
          }
          return <PortList key={type} type={type} value={value} />;
        })}
      </div>
    </div>
  );
};
