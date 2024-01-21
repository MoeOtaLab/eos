import { Button, message } from 'antd';
import {
  useDiagramsContext,
  useDiagramsHookOption,
} from '../../State/DiagramsProvider';
import { Layer, findLayer } from '../../State/Layer';
import { getOperatorFromNode } from '../../Operators';
import { type GroupOperator } from '../../Operators/GroupOperator';
import { sleepMs } from '../../utils';
import { loopDemoData, sumDemoData } from './defaultData';

const STORAGE_KEY = 'layer_storage';

export function CommandPanel() {
  const { layer, setLayer, setActiveLayerId } = useDiagramsContext();
  const { actionsRef, currentStateRef } = useDiagramsHookOption();

  async function handleSave() {
    try {
      if (layer.parentLayerId) {
        const parentLayer = findLayer(layer, layer.parentLayerId);
        const targetNode = parentLayer?.nodes.find(
          (item) => item.id === layer.relativeNodeId,
        );

        if (targetNode) {
          const operator = getOperatorFromNode<GroupOperator>(targetNode);

          operator?.refreshNode({
            node: targetNode,
            actions: actionsRef.current,
            currentState: currentStateRef.current,
          });
        }
      }
      await sleepMs(200);
      const layerDataJson = JSON.stringify(currentStateRef.current.layer);
      localStorage.setItem(STORAGE_KEY, layerDataJson);
      message.success('success');
    } catch (error: any) {
      message.error(error?.message);
    }
  }

  return (
    <div style={{ display: 'grid', gridAutoFlow: 'row', gap: 4 }}>
      <Button
        type="text"
        onClick={() => {
          handleSave();
        }}
      >
        Save
      </Button>
      <Button
        type="text"
        onClick={() => {
          try {
            const layerData: Layer = JSON.parse(
              localStorage.getItem(STORAGE_KEY) || '',
            );
            setLayer(layerData);
            setActiveLayerId(layerData.id);
            message.success('success');
          } catch (error: any) {
            message.error(error?.message);
          }
        }}
      >
        Load
      </Button>

      <Button
        type="text"
        onClick={() => {
          try {
            const newLayer = new Layer('App');
            setLayer(newLayer);
            setActiveLayerId(newLayer.id);
            message.success('success');
          } catch (error: any) {
            message.error(error?.message);
          }
        }}
      >
        Reset
      </Button>

      <Button
        type="text"
        onClick={() => {
          console.log(layer);
        }}
      >
        Log
      </Button>

      <Button
        type="text"
        onClick={() => {
          try {
            setLayer(loopDemoData);
            setActiveLayerId(loopDemoData.id);
            message.success('success');
          } catch (error: any) {
            message.error(error?.message);
          }
        }}
      >
        Load Loop Demo
      </Button>

      <Button
        type="text"
        onClick={() => {
          try {
            setLayer(sumDemoData);
            setActiveLayerId(sumDemoData.id);
            message.success('success');
          } catch (error: any) {
            message.error(error?.message);
          }
        }}
      >
        Load Sum Demo
      </Button>
    </div>
  );
}
