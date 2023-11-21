import { type PropsWithChildren } from 'react';
import classnames from 'classnames';
import { type NodeProps } from 'reactflow';
import { type IBaseNodeData } from '../../types';
import { PortList } from './PortList';
import css from './BaseNode.module.less';

export function BaseNode(
  props: PropsWithChildren<
    NodeProps<IBaseNodeData> & {
      className?: string;
      title?: React.ReactNode;
      onSourcePortAdd?: () => void;
      onTargetPortAdd?: () => void;
      onDoubleClick?: () => void;
      description?: string;
      onFocus?: () => void;
    }
  >,
) {
  const {
    data,
    selected,
    className,
    title,
    onSourcePortAdd,
    onTargetPortAdd,
    onDoubleClick,
    description,
    onFocus,
  } = props;
  const operatorName = data?.operatorName;

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
      className={classnames(
        css.node__container,
        {
          [css['is-selected']]: selected,
        },
        className,
      )}
      onClick={() => {
        onFocus?.();
      }}
    >
      <div className={css['node__operator-name']}>{operatorName}</div>
      <div className={css.node__content} onDoubleClick={onDoubleClick}>
        <div className={css.node__title}>
          <div className={css['node__operator-description']}>{description}</div>
          <div>{data.label}</div>
          <div>{title}</div>
        </div>
        {ports?.map(({ type, value }) => {
          if (!value?.length) {
            return null;
          }
          return (
            <PortList
              onPortAdd={type === 'source' ? onSourcePortAdd : onTargetPortAdd}
              key={type}
              type={type}
              value={value}
            />
          );
        })}
      </div>
    </div>
  );
}
