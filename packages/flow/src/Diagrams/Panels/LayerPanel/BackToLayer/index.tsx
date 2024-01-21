import { flushSync } from 'react-dom';
import { Button } from 'antd';
import {
  useDiagramsContextSelector,
  useDiagramsActions,
  useDiagramsHookOption,
} from '../../../State/DiagramsProvider';
import { findLayer } from '../../../State/Layer';
import { useOperators } from '../../../State/OperatorProvider';

export function BackToLayer() {
  const { operators } = useOperators();
  const { actionsRef, currentStateRef } = useDiagramsHookOption();
  const [layerId, layerName] = useDiagramsContextSelector((ctx) => {
    const activeLayer = findLayer(ctx.layer, ctx.activeLayerId);
    const targetLayer = activeLayer?.parentLayerId
      ? findLayer(ctx.layer, activeLayer?.parentLayerId)
      : undefined;

    return [targetLayer?.id, targetLayer?.name];
  });

  const { setActiveLayerId, setLayer } = useDiagramsActions();

  const defaultLayer = useDiagramsContextSelector((ctx) => {
    if (ctx.layer?.id === ctx.defaultLayer?.id) {
      return undefined;
    }
    return ctx.defaultLayer;
  });

  return (
    <>
      {defaultLayer ? (
        <Button
          type="text"
          style={{ color: 'white' }}
          onClick={() => {
            flushSync(() => {
              setLayer(defaultLayer);
              setActiveLayerId(defaultLayer.id);
            });
            setTimeout(() => {
              operators.forEach((operator) => {
                operator.onLayerChange?.({
                  currentState: currentStateRef.current,
                  actions: actionsRef.current,
                });
              });
            });
          }}
        >
          Back To Default
        </Button>
      ) : null}

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
