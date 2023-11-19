import { type NodeProps } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { type ICustomNodeData } from '../types';
import { useDiagramsActions } from '../../State/DiagramsProvider';
import css from './CustomNode.module.less';

export function CustomNode(props: NodeProps<ICustomNodeData>) {
  const { data } = props;
  const { setActiveLayerId } = useDiagramsActions();

  return (
    <BaseNode
      description={data.description}
      onDoubleClick={() => {
        setActiveLayerId(data.layerId);
      }}
      {...props}
      className={css.container}
    />
  );
}
