import { v4 as uuid } from 'uuid';
import { type Node, type Edge } from 'reactflow';

export class Layer {
  id: string;

  name: string;

  children: Layer[] = [];

  nodes: Node[] = [];

  edges: Edge[] = [];

  parentLayerId?: Layer['id'];

  /** 对应的 nodeId */
  relativeNodeId?: string;

  /** 对应的 operatorType */
  relativeOperatorType?: string;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }
}

export function findLayer(layer: Layer, layerId: string): Layer | undefined {
  if (layer.id === layerId) {
    return layer;
  }

  for (const child of layer.children) {
    const targetLayer = findLayer(child, layerId);
    if (targetLayer) {
      return targetLayer;
    }
  }

  return undefined;
}

export function flatLayer(layer: Layer) {
  const queue: Layer[] = [layer];
  let currentLayer = queue.pop();
  const result: Layer[] = [];

  while (currentLayer) {
    result.push(currentLayer);

    if (currentLayer?.children?.length) {
      queue.push(...currentLayer.children);
    }

    currentLayer = queue.pop();
  }

  result.reverse();
  return result;
}
