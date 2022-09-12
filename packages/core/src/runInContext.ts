import type { ModelNode } from './ModelNode';

type CurrentModelNode = ModelNode<any, any, any, any> | undefined;
export let currentModelNode: CurrentModelNode;

export function runInContext<T extends any>(
  newContext: CurrentModelNode,
  fn: () => T
) {
  const lastContext = currentModelNode;
  currentModelNode = newContext;
  const result = fn();
  currentModelNode = lastContext;
  return result;
}
