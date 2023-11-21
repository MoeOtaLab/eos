import { type Node } from 'reactflow';
import { type ICustomNodeData } from '../../../Nodes/types';
import { useDiagramsContext } from '../../../State/DiagramsProvider';
import { Button, Form, Input } from 'antd';
import { findLayer } from '../../../State/Layer';
import { OperatorMap } from '../../index';
import { type CustomOperator } from '..';

export function AttributeControl(props: { node: Node<ICustomNodeData> }) {
  const { node } = props;
  const { updateNode, layer, setLayer } = useDiagramsContext();

  const Operator = OperatorMap.get(
    node.data.operatorType,
  ) as typeof CustomOperator;

  return (
    <div>
      <Form.Item label="name">
        <Input
          size="small"
          placeholder="name"
          defaultValue={node.data.operatorName}
          onBlur={(e) => {
            const name = e.target.value;
            updateNode(node.id, (v) => ({
              ...v,
              data: {
                ...v?.data,
                operatorName: name,
              },
            }));
            setTimeout(() => {
              setLayer((layer) => {
                const targetLayer = findLayer(layer, node.data.layerId);
                if (targetLayer) {
                  targetLayer.name = name;
                }
                return { ...layer };
              });
            });
          }}
        />
      </Form.Item>
      <Form.Item label="手动刷新">
        <Button
          size="small"
          onClick={() => {
            Operator.refreshNode(node, {
              layer,
              updateNode,
            });
          }}
        >
          刷新
        </Button>
      </Form.Item>
    </div>
  );
}
