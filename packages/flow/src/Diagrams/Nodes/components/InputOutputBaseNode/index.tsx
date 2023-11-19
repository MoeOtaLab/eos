import classnames from 'classnames';
import { type PropsWithChildren } from 'react';
// import { InputNodePortTypeEnum, OutputNodePortTypeEnum } from '../../types';
import css from './InputOutputBaseNode.module.less';

interface InputOutputBaseNodeProps {
  label?: string;
  selected?: boolean;
  className?: string;
}

export function InputOutputBaseNode(
  props: PropsWithChildren<InputOutputBaseNodeProps>,
) {
  const { children, label, selected, className } = props;
  return (
    <div
      className={classnames(css.container, className, {
        [css.selected]: selected,
      })}
    >
      <div className={css.label}>{label}</div>
      <div className={css.content}>{children}</div>
    </div>
  );
}
