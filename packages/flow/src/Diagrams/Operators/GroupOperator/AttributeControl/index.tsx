import { type Node } from 'reactflow';
import { useDiagramsContext, useDiagramsHookOption } from '../../../State/DiagramsProvider';
import { Button, Form, Input } from 'antd';
import { findLayer } from '../../../State/Layer';
import { type GroupOperator } from '..';
import { type IGroupOperatorData } from '../../types';
import { getOperatorFromNode } from '../../OperatorMap';

export function AttributeControl(props: { node: Node<IGroupOperatorData> }) {
  const { node } = props;
  const { updateNode, setLayer } = useDiagramsContext();
  const { currentStateRef, actionsRef } = useDiagramsHookOption();

  const operator = getOperatorFromNode<GroupOperator>(node);

  return (
    <div>
      <Form.Item label="name">
        <Input
          size="small"
          placeholder="name"
          defaultValue={node.data?.nodeLabel}
          onBlur={(e) => {
            if (operator) {
              const name = e.target.value;
              updateNode(node.id, (v) =>
                operator?.updateData(v as Node<IGroupOperatorData>, {
                  nodeLabel: name
                })
              );
              setTimeout(() => {
                setLayer((layer) => {
                  const targetLayer = findLayer(layer, node.data.layerId);
                  if (targetLayer) {
                    targetLayer.name = name;
                  }
                  return { ...layer };
                });
              });
            }
          }}
        />
      </Form.Item>
      <Form.Item label="手动刷新">
        <Button
          size="small"
          onClick={() => {
            operator?.refreshNode({
              currentState: currentStateRef.current,
              actions: actionsRef.current,
              node
            });
          }}
        >
          刷新
        </Button>
      </Form.Item>
    </div>
  );
}
