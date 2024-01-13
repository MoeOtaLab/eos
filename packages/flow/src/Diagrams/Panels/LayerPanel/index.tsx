import classnames from 'classnames';
import {
  useDiagramsContext,
  useDiagramsHookOption,
} from '../../State/DiagramsProvider';
import { Button, Input, Modal } from 'antd';
import { type Layer } from '../../State/Layer';
import { getOperatorFromOperatorType } from '../../Operators';
import css from './LayerPanel.module.less';

export function LayerPanel() {
  const { layer, activeLayerId, setActiveLayerId } = useDiagramsContext();
  const { currentStateRef, actionsRef } = useDiagramsHookOption();

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
                const customOperator =
                  getOperatorFromOperatorType('CustomOperator');
                if (!customOperator) {
                  return;
                }

                const newNode = customOperator?.create();

                // add nodes
                customOperator.onAfterCreate({
                  node: newNode,
                  currentState: currentStateRef.current,
                  actions: actionsRef.current,
                });
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
