import { Button, message } from 'antd';
import {
  useDiagramsContext,
  useDiagramsHookOption,
} from '../../State/DiagramsProvider';
import { Layer, findLayer } from '../../State/Layer';
import { getOperatorFromNode, registerOperators } from '../../Operators';
import { type GroupOperator } from '../../Operators/GroupOperator';
import { sleepMs } from '../../utils';
import { loopDemoData, sumDemoData } from './defaultData';
import { useOperators } from '../../State/OperatorProvider';
import { type MetaOperator } from '../../Operators/Operator';
import { CustomOperator } from '../../Operators/CustomOperator';

const STORAGE_KEY = 'layer_storage';

interface IStorageData {
  layer: Layer;
  customOperators: MetaOperator[];
}

function saveData(data: IStorageData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData(): IStorageData {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '');
}

export function CommandPanel() {
  const { layer, setLayer, setActiveLayerId, setDefaultLayer } =
    useDiagramsContext();
  const { actionsRef, currentStateRef } = useDiagramsHookOption();
  const { operators, refreshOperators } = useOperators();

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
      saveData({
        layer: currentStateRef.current.layer,
        customOperators: operators.filter((item) => item.isCustom),
      });
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
            const data = loadData();
            const layerData = data.layer;
            setLayer(layerData);
            setDefaultLayer(layerData);
            setActiveLayerId(layerData.id);
            const operators = data.customOperators.map((item) => {
              const operater = new CustomOperator(item.operatorName);
              Object.assign(operater, item);
              return operater;
            });
            registerOperators(operators);
            refreshOperators();
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
            setDefaultLayer(newLayer);
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
            setDefaultLayer(loopDemoData);
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
            setDefaultLayer(sumDemoData);
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
