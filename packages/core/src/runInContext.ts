import type { ModelNode } from './ModelNode';

type CurrentModelNode = ModelNode<any, any, any, any> | undefined;
export let currentModelNode: CurrentModelNode;

export function runInContext(newContext: CurrentModelNode, fn: () => void) {
  const lastContext = currentModelNode;
  currentModelNode = newContext;
  fn();
  currentModelNode = lastContext;
}
