import classnames from 'classnames';
import { getOperatorFromNode } from '../../Operators';
import { type NodeProps } from 'reactflow';
import css from './Node.module.less';
import { type IMetaOperatorData } from '../../Operators/types';
import { NodePorts } from './components/NodePorts';
import { useDiagramsHookOption } from '../../State/DiagramsProvider';
import { message } from 'antd';

export interface INodeProps {
  showValue?: boolean;
  getBriefValue?: () => { value: string; hasDetail?: boolean };
  getDetailValue?: () => string;
}

export function Node(props: NodeProps<IMetaOperatorData>) {
  const operator = getOperatorFromNode(props);
  const { currentStateRef, actionsRef } = useDiagramsHookOption();

  const { selected, data } = props;
  const nodeOptions: INodeProps | undefined = operator?.getNodeProps?.(props);

  function renderValueSection() {
    if (!nodeOptions?.showValue) {
      return null;
    }

    const briefValue = nodeOptions?.getBriefValue?.();

    if (!briefValue) {
      return null;
    }

    return (
      <div
        className={css['value-container']}
        onClick={() => {
          if (briefValue.hasDetail) {
            message.info(nodeOptions?.getDetailValue?.() || '');
          }
        }}
      >
        {briefValue.value}
      </div>
    );
  }

  const valueSection = renderValueSection();

  const headerInfo = [
    operator?.description && (
      <div className={css['node__operator-description']}>
        {operator?.description}
      </div>
    ),
    valueSection && <div>{valueSection}</div>,
  ].filter(Boolean);

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
        {headerInfo?.length ? (
          <div className={css.node__title}>
            {headerInfo}
            {/* <div>{data.label}</div> */}
          </div>
        ) : null}
        <NodePorts node={props} />
      </div>
    </div>
  );
}
