import { Handle, Position, type Node } from 'reactflow';
import { InputOutputBaseNode } from '../components/InputOutputBaseNode';
import { type IOutputNodeData, OutputNodePortTypeEnum } from '../types';
import { groupBy } from 'lodash';
import css from './OutputNode.module.less';

// state
export function OutputNode(props: Node<IOutputNodeData>) {
  const {
    data: { targetPorts },
    selected,
  } = props;

  const targetPortTypeMap = groupBy(targetPorts, (value) => value.type);

  const typeList = [OutputNodePortTypeEnum.State, OutputNodePortTypeEnum.Event];

  return (
    <InputOutputBaseNode
      label="Output"
      selected={selected}
      className={css.wrapper}
    >
      <div className={css.container}>
        {typeList.map((type) => {
          return (
            <div key={type} className={css['port-type-container']}>
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
          );
        })}
      </div>
    </InputOutputBaseNode>
  );
}
