import { Model } from './src/types';
import { ModelNode, LifecycleIndicator } from './src/ModelNode';
import { runInContext, currentModelNode } from './src/runInContext';
import { computed, Ref } from '@vue/reactivity';

export function setupModel<
  T extends Model,
  P extends LifecycleIndicator | undefined = undefined
>(model: T, props: Parameters<T>['0'] = {}, lifecycleIndicator?: P) {
  const modelNode = new ModelNode({
    model,
    props,
    lifecycleIndicator,
    parent: currentModelNode,
  });

  runInContext(modelNode, () => {
    modelNode.initialize();
  });

  return modelNode;
}

export function setupDyanamicModel<
  DModel extends Model,
  ListData extends Record<string, any>,
  P extends LifecycleIndicator | undefined = undefined
>(
  model: DModel,
  options: {
    /** recognize different instance */
    key?: string;
    list: Ref<ListData[]>;
    props?: (item: ListData, index: number) => Parameters<DModel>['0'];
    lifecycleIndicator?: (item: ListData, index: number) => P;
  }
) {
  const { list, props, lifecycleIndicator } = options;
  const context = currentModelNode;

  const dModelList = computed(() =>
    list.value?.map((item, index) => {
      const modelWillUpdate = runInContext(context, () =>
        setupModel(
          model,
          props?.(item, index),
          lifecycleIndicator?.(item, index)
        )
      );

      // TODO: need to reuse model generated last time.
      return modelWillUpdate;
    })
  );

  return dModelList;
}

export function mount(fn?: () => void) {
  fn?.();
}

export function unmount(fn?: () => void) {
  if (currentModelNode) {
    currentModelNode.addUnmountCallback(fn);
  }
}

export function provideContext(...args: any[]): any {}
export function injectContext(...args: any[]): any {}
export function createContext(...args: any[]): any {}

export function useModel(...args: any[]): any {}
export function linkModel(...args: any[]): any {}
