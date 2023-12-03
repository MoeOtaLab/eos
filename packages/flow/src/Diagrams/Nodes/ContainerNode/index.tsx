import { type NodeProps } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import css from './ContainerNode.module.less';
import { useDiagramsContext } from '../../State/DiagramsProvider';

export function ContainerNode(props: NodeProps<any>) {
  const { data } = props;
  const { setActiveLayerId } = useDiagramsContext();

  return (
    <BaseNode
      onDoubleClick={() => {
        setActiveLayerId(data.layerId);
      }}
      {...props}
      className={css.container}
    />
  );
}
