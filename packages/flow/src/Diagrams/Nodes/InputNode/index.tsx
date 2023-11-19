import { Handle, type Node, Position } from 'reactflow';
import { InputOutputBaseNode } from '../components/InputOutputBaseNode';
import { type IInputNodeData, InputNodePortTypeEnum, NodePort } from '../types';
import { groupBy } from 'lodash';
import css from './InputNode.module.less';
import { useDiagramsActions } from '../../State/DiagramsProvider';
// event + props + lifecycle;

export function InputNode(props: Node<IInputNodeData>) {
  const {
    data: { sourcePorts },
    id,
    selected,
  } = props;

  const { updateNode } = useDiagramsActions();

  const sourcePortTypeMap = groupBy(sourcePorts, (value) => value.type);

  const InputTypes = [
    {
      type: InputNodePortTypeEnum.State,
      isAbleToAdd: true,
    },
    {
      type: InputNodePortTypeEnum.Event,
      isAbleToAdd: true,
    },
    {
      type: InputNodePortTypeEnum.LifeCycle,
    },
  ];

  return (
    <InputOutputBaseNode
      label="Input"
      selected={selected}
      className={css.wrapper}
    >
      <div className={css.container}>
        {InputTypes.map(({ type, isAbleToAdd }) => {
          return (
            <div key={type}>
              <div className={css['port-type-container']}>
                <div className={css['port-type-label']}>{type}</div>
                {sourcePortTypeMap[type]?.map((port) => (
                  <div key={port.id} style={{ position: 'relative' }}>
                    <div style={{ textAlign: 'right' }}>{port.label}</div>
                    <Handle
                      type={'source'}
                      position={Position.Right}
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
                    updateNode(id, (node: Node<IInputNodeData>) => ({
                      ...node,
                      data: {
                        ...node.data,
                        sourcePorts: node.data?.sourcePorts.concat(
                          new NodePort({
                            label: `${type}-${
                              sourcePortTypeMap[type]?.length || 0
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
