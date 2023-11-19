import { type NodeProps } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { type IStateNodeData } from '../types';
import css from './StateNode.module.less';

export function StateNode(props: NodeProps<IStateNodeData>) {
  return <BaseNode {...props} className={css['state-node__container']} />;
}
