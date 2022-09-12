import { Model } from './src/types';
import { ModelNode, LifecycleIndicator } from './src/ModelNode';
import { runInContext, currentModelNode } from './src/runInContext';
import { ref, Ref, computed, ReactiveEffect } from '@vue/reactivity';

type RefValue<T> = T extends Ref<infer P> ? P : unknown;

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
    key?: keyof ListData;
    list: Ref<ListData[]>;
    props?: (item: ListData, index: number) => Parameters<DModel>['0'];
    lifecycleIndicator?: (item: ListData, index: number) => P;
  }
) {
  const { list, props, lifecycleIndicator, key } = options;
  const context = currentModelNode;

  const dModelList = ref<
    {
      model: ModelNode<DModel, ReturnType<DModel>, Parameters<DModel>['0'], P>;
      uuid: string | number;
    }[]
  >([]);

  function updateList() {
    // TODO: need a scheduler
    const lastList = dModelList.value;
    const usedSet = new WeakSet<RefValue<typeof dModelList>[number]['model']>();

    const listWillUpdate = list.value?.map((item, index) => {
      let modelWillUpdate = lastList?.find((lastItem) =>
        lastItem.uuid === key ? item[key || ''] : index
      )?.model;

      if (!modelWillUpdate) {
        // @ts-expect-error
        modelWillUpdate = runInContext(context, () =>
          setupModel(
            model,
            props?.(item, index),
            lifecycleIndicator?.(item, index)
          )
        );
      } else {
        usedSet.add(modelWillUpdate);
        // TODO: soft update
      }

      return {
        uuid: key ? item[key || ''] : index,
        model: modelWillUpdate,
      };
    });

    lastList
      .map((item) => item.model)
      .filter((item) => !usedSet.has(item))
      .forEach((model) => {
        model?.unmount();
      });

    // @ts-expect-error
    dModelList.value = listWillUpdate;
  }

  const effect = new ReactiveEffect(
    () => {
      function seen(value: any) {
        return value;
      }
      if (Array.isArray(list.value)) {
        for (const key of Object.keys(list.value)) {
          const value = list.value[key as unknown as number];
          seen(value);
        }
      }
    },
    () => {
      effect.run();
      console.log('23333');
      updateList();
    }
  );

  effect.run();

  return computed(() => dModelList.value.map((item) => item.model));
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
