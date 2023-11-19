import { type Node } from 'reactflow';
import {
  type ICustomNodeData,
  type IInputNodeData,
  type IOutputNodeData,
  InputNodePortTypeEnum,
} from '../../../Nodes/types';
import { useDiagramsContext } from '../../../State/DiagramsProvider';
import { Button, Form, Input } from 'antd';
import { findLayer } from '../../../State/Layer';
import { NodeTypeEnum } from '../../../Nodes/NodeTypeEnum';

export function AttributeControl(props: { node: Node<ICustomNodeData> }) {
  const { node } = props;
  const { updateNode, layer, setLayer } = useDiagramsContext();

  function refreshPort() {
    const targetLayer = findLayer(layer, node.data.layerId);

    if (targetLayer) {
      const inputNode = targetLayer.nodes.find(
        (item): item is Node<IInputNodeData> =>
          item.type === NodeTypeEnum.InputNode,
      );
      const outputNode = targetLayer.nodes.find(
        (item): item is Node<IOutputNodeData> =>
          item.type === NodeTypeEnum.OutputNode,
      );

      const sourcePorts =
        inputNode?.data?.sourcePorts?.filter((item) =>
          [InputNodePortTypeEnum.State, InputNodePortTypeEnum.Event].includes(
            item.type as InputNodePortTypeEnum,
          ),
        ) || [];

      const targetPorts = outputNode?.data?.targetPorts || [];

      updateNode(node.id, (v) => ({
        ...v,
        data: {
          ...v.data,
          // 攻守互换
          sourcePorts: targetPorts,
          targetPorts: sourcePorts,
        } as ICustomNodeData,
      }));
    }
  }

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
        <Button size="small" onClick={refreshPort}>
          刷新
        </Button>
      </Form.Item>
    </div>
  );
}
