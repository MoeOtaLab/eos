import { Button, message } from 'antd';
import { useDiagramsContext } from '../../State/DiagramsProvider';
import { Layer } from '../../State/Layer';

const STORAGE_KEY = 'layer_storage';

export function CommandPanel() {
  const { layer, setLayer, setActiveLayerId } = useDiagramsContext();

  return (
    <div style={{ display: 'grid', gridAutoFlow: 'row', gap: 4 }}>
      <Button
        type="text"
        onClick={() => {
          try {
            const layerDataJson = JSON.stringify(layer);
            localStorage.setItem(STORAGE_KEY, layerDataJson);
            message.success('success');
          } catch (error: any) {
            message.error(error?.message);
          }
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
    </div>
  );
}
