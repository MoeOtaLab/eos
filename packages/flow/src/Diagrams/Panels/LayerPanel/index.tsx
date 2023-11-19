import classnames from 'classnames';
import { useDiagramsContext } from '../../State/DiagramsProvider';
import { Button, Input, Modal } from 'antd';
import { type Node } from 'reactflow';
import { findLayer, Layer } from '../../State/Layer';
import { StateOperator } from '../../Operators/StateOperator';
import css from './LayerPanel.module.less';

export function LayerPanel() {
  const { layer, activeLayerId, setActiveLayerId, setLayer } =
    useDiagramsContext();

  function renderLayers(layers: Layer[], index: number = 0) {
    return (
      <div>
        {layers.map((item) => (
          <div key={item.id}>
            <div
              className={classnames(css['layer-container'], {
                [css.active]: activeLayerId === item.id,
              })}
              onClick={() => {
                setActiveLayerId(item.id);
              }}
              style={{ cursor: 'pointer' }}
            >
              {item.name}
            </div>
            <div style={{ marginLeft: 4 * (index + 1) }}>
              {renderLayers(item.children || [], index + 1)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div>Layer Panel</div>
      {renderLayers([layer])}
      <Button
        type="link"
        onClick={() => {
          let name = '';
          Modal.info({
            title: 'Please Input Layer Name',
            content: (
              <div>
                <Input
                  onChange={(event) => {
                    name = event.target.value;
                  }}
                ></Input>
              </div>
            ),
            onOk() {
              if (name) {
                const currentActiveLayer = findLayer(layer, activeLayerId);
                const newNode: Node = new StateOperator();
                newNode.style = {
                  visibility: 'visible',
                };
                const newLayer = new Layer(name);
                newLayer.relativeNodeId = newNode.id;
                newLayer.parentLayerId = currentActiveLayer?.id;

                // todo: 设置之后不会马上展示新的 node，需要排查
                setLayer((layer) => {
                  const currentActiveLayer = findLayer(layer, activeLayerId);
                  if (currentActiveLayer) {
                    currentActiveLayer.nodes.push(newNode);
                    currentActiveLayer.children.push(newLayer);
                  }
                  return { ...layer };
                });

                setActiveLayerId(newLayer.id);
              }
            },
          });
        }}
      >
        Add Layer
      </Button>
    </div>
  );
}
