import { Handle, type Node, Position } from 'reactflow';
import { InputOutputBaseNode } from '../components/InputOutputBaseNode';
import { type IInputNodeData, InputNodePortTypeEnum } from '../types';
import { groupBy } from 'lodash';
import css from './InputNode.module.less';
// event + props + lifecycle;

export function InputNode(props: Node<IInputNodeData>) {
  const {
    data: { sourcePorts },
    selected,
  } = props;

  const sourcePortTypeMap = groupBy(sourcePorts, (value) => value.type);

  const InputTypes = [
    InputNodePortTypeEnum.State,
    InputNodePortTypeEnum.Event,
    InputNodePortTypeEnum.LifeCycle,
  ];

  return (
    <InputOutputBaseNode
      label="Input"
      selected={selected}
      className={css.wrapper}
    >
      <div className={css.container}>
        {InputTypes.map((type) => {
          return (
            <div key={type} className={css['port-type-container']}>
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
          );
        })}
      </div>
    </InputOutputBaseNode>
  );
}
