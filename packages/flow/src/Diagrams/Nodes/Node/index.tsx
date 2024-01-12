import classnames from 'classnames';
import { getOperatorFromNode } from '../../Operators';
import { type NodeProps } from 'reactflow';
import css from './Node.module.less';
import { type IMetaOperatorData } from '../../Operators/types';
import { NodePorts } from './components/NodePorts';
import { useDiagramsHookOption } from '../../State/DiagramsProvider';

export function Node(props: NodeProps<IMetaOperatorData>) {
  const operator = getOperatorFromNode(props);
  const { currentStateRef, actionsRef } = useDiagramsHookOption();

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
      onClick={() => {
        operator?.onNodeFocus({
          node: props as any,
          currentState: currentStateRef.current,
          actions: actionsRef.current,
        });
      }}
    >
      <div className={css.label}>{data?.nodeLabel || data?.operatorName}</div>
      <div
        className={css.content}
        onDoubleClick={() => {
          operator?.onNodeDoubleClick({
            node: props as any,
            currentState: currentStateRef.current,
            actions: actionsRef.current,
          });
        }}
      >
        {operator?.description && (
          <div className={css.node__title}>
            <div className={css['node__operator-description']}>
              {operator?.description}
            </div>
            {/* <div>{data.label}</div> */}
            {/* <div>{title}</div> */}
          </div>
        )}
        <NodePorts node={props} />
      </div>
    </div>
  );
}
