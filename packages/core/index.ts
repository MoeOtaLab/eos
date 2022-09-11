import { Model } from './src/types';
import { ModelNode, LifecycleIndicator } from './src/ModelNode';

export function setupModel<
  T extends Model,
  P extends LifecycleIndicator | undefined = undefined
>(model: T, props: Parameters<T>['0'] = {}, lifecycleIndicator?: P) {
  const modelNode = new ModelNode({
    model,
    props,
    lifecycleIndicator,
  });

  return modelNode;
}

export function provideContext(...args: any[]): any {}
export function injectContext(...args: any[]): any {}
export function createContext(...args: any[]): any {}
export function useModel(...args: any[]): any {}
export function linkModel(...args: any[]): any {}
export function setupDyanamicModel(...args: any[]): any {}
