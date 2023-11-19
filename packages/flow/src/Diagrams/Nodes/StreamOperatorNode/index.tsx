import { type NodeProps, type Node } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { NodePort, type IStreamOperatorNodeData } from '../types';
import { useDiagramsActions } from '../../State/DiagramsProvider';
import css from './StreamOperatorNode.module.less';

export function StreamOperatorNode(props: NodeProps<IStreamOperatorNodeData>) {
  const { data, id } = props;
  const { updateNode } = useDiagramsActions();

  return (
    <BaseNode
      onTargetPortAdd={
        data?.allowAddTargetPort
          ? () => {
              updateNode(id, (node: Node<IStreamOperatorNodeData>) => ({
                ...node,
                data: {
                  ...node.data,
                  targetPorts: node.data.targetPorts.concat(
                    new NodePort({
                      label: `input-${node.data.targetPorts?.length + 1 || 0}`,
                    }),
                  ),
                },
              }));
            }
          : undefined
      }
      {...props}
      className={css.container}
    />
  );
}
