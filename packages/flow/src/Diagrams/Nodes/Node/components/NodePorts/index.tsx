import css from './NodePorts.module.less';
import { EndPoint, type IMetaOperatorData } from '../../../../Operators/types';
import { Handle, Position, type Node } from 'reactflow';
import { useDiagramsActions } from '../../../../State/DiagramsProvider';
import { getOperatorFromNode } from '../../../../Operators';

export function NodePorts(props: { node: Partial<Node<IMetaOperatorData>> }) {
  const { node } = props;
  const endPointOptions = node?.data?.endPointOptions;
  const { updateNode } = useDiagramsActions();
  const operator = getOperatorFromNode(node);

  if (!endPointOptions?.endPointList?.length || !operator) {
    return null;
  }

  return (
    <div className={css.container}>
      {endPointOptions.endPointList.map((item) => {
        if (item.type === 'group') {
          if (!item.children?.length && !item.allowAddAndRemoveChildren) {
            return null;
          }

          return (
            <div key={item.id}>
              <div className={css['port-type-container']}>
                <div className={css['port-type-label']}>{item.label}</div>
                {item.children?.map((port) => {
                  if (port.type !== 'source' && port.type !== 'target') {
                    return <div key={port.id}>unknown type: {port.type}</div>;
                  }

                  return (
                    <div key={port.id} style={{ position: 'relative' }}>
                      <div
                        style={{
                          textAlign: port.type === 'source' ? 'right' : 'left',
                        }}
                      >
                        {port.label || port.variableName}
                      </div>
                      <Handle
                        type={port.type}
                        position={
                          port.type === 'source'
                            ? Position.Right
                            : Position.Left
                        }
                        id={port.id}
                        isConnectable={true}
                      />
                    </div>
                  );
                })}
              </div>
              {item.allowAddAndRemoveChildren && (
                <span
                  className={css['add-button']}
                  onClick={() => {
                    if (!node?.id) {
                      return;
                    }
                    updateNode(node?.id, (node: Node<IMetaOperatorData>) => {
                      item.children = (item.children || []).concat(
                        EndPoint.createFromGroup(item),
                      );
                      return operator.updateData(node, {});
                    });
                  }}
                >
                  add port
                </span>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
