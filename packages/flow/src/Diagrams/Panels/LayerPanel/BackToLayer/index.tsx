import { Button } from 'antd';
import {
  useDiagramsContextSelector,
  useDiagramsActions,
} from '../../../State/DiagramsProvider';
import { findLayer } from '../../../State/Layer';

export function BackToLayer() {
  const [layerId, layerName] = useDiagramsContextSelector((ctx) => {
    const activeLayer = findLayer(ctx.layer, ctx.activeLayerId);
    const targetLayer = activeLayer?.parentLayerId
      ? findLayer(ctx.layer, activeLayer?.parentLayerId)
      : undefined;

    return [targetLayer?.id, targetLayer?.name];
  });

  const { setActiveLayerId } = useDiagramsActions();

  return (
    <>
      {layerId && (
        <Button
          type="text"
          style={{ color: 'white' }}
          onClick={() => {
            setActiveLayerId(layerId);
          }}
        >
          返回 {layerName || layerId}
        </Button>
      )}
    </>
  );
}
