import classnames from 'classnames';
import { getOperatorFromNode } from '../../Operators';
import { type NodeProps } from 'reactflow';
import css from './Node.module.less';
import { type IMetaOperatorData } from '../../Operators/types';
import { NodePorts } from './components/NodePorts';

export function Node(props: NodeProps<IMetaOperatorData>) {
  const operator = getOperatorFromNode(props);

  const { selected, data } = props;

  return (
    <div
      className={classnames(css.container, {
        [css.selected]: selected,
      })}
      style={
        {
          '--color-node-theme': operator?.nodeColor || undefined,
        } as any
      }
    >
      <div className={css.label}>{data?.nodeLabel || data?.operatorName}</div>
      <div className={css.content}>
        {/* PORTS */}
        <NodePorts node={props} />
      </div>
    </div>
  );
}
