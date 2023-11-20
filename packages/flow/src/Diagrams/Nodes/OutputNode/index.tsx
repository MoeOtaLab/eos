import { Handle, Position, type Node } from 'reactflow';
import { InputOutputBaseNode } from '../components/InputOutputBaseNode';
import {
  type IOutputNodeData,
  OutputNodePortTypeEnum,
  NodePort,
} from '../types';
import { groupBy } from 'lodash';
import { useDiagramsActions } from '../../State/DiagramsProvider';
import css from './OutputNode.module.less';

// state
export function OutputNode(props: Node<IOutputNodeData>) {
  const {
    data: { targetPorts },
    selected,
    id,
  } = props;

  const { updateNode } = useDiagramsActions();

  const targetPortTypeMap = groupBy(targetPorts, (value) => value.type);

  const typeList = [
    {
      type: OutputNodePortTypeEnum.State,
      isAbleToAdd: true,
    },
    {
      type: OutputNodePortTypeEnum.Event,
      isAbleToAdd: true,
    },
  ];

  return (
    <InputOutputBaseNode
      label="Output"
      selected={selected}
      className={css.wrapper}
    >
      <div className={css.container}>
        {typeList.map(({ type, isAbleToAdd }) => {
          return (
            <div key={type}>
              <div className={css['port-type-container']}>
                <div className={css['port-type-label']}>{type}</div>
                {targetPortTypeMap[type]?.map((port) => (
                  <div key={port.id} style={{ position: 'relative' }}>
                    <div style={{ textAlign: 'left' }}>{port.label}</div>
                    <Handle
                      type={'target'}
                      position={Position.Left}
                      id={port.id}
                      isConnectable={true}
                    />
                  </div>
                ))}
              </div>
              {isAbleToAdd && (
                <span
                  className={css['add-button']}
                  onClick={() => {
                    updateNode(id, (node: Node<IOutputNodeData>) => ({
                      ...node,
                      data: {
                        ...node.data,
                        targetPorts: node.data?.targetPorts.concat(
                          new NodePort({
                            label: `Output${type}-${
                              (targetPortTypeMap[type]?.length || 0) + 1
                            }`,
                            type,
                          }),
                        ),
                      },
                    }));
                  }}
                >
                  add port
                </span>
              )}
            </div>
          );
        })}
      </div>
    </InputOutputBaseNode>
  );
}
