import { ModelBlockContextType, SetupFn, ModelBlock } from '../ModelBlock';
import { Action, ModelState } from '../ModelState';
import { get } from 'lodash';

export function ListMState<
  T extends {
    listState: ModelState<Record<any, any>[]>;
    templateState: ModelState<SetupFn<{ index: ModelState<number>; data: T['listState']; key: string }, any>>;
    key: string;
  }
>(input: T, context: ModelBlockContextType) {
  const { listState, key, templateState, ...others } = input;
  const { mount, unmount, onLifecycle } = context;

  const modelList = new ModelState<
    {
      key: any;
      index: ModelState<number>;
      instance: ModelBlock<
        {
          index: ModelState<number>;
          data: T['listState'];
          key: string;
        },
        any
      >;
    }[]
  >([]);

  onLifecycle('postInit', () => {
    modelList.next(
      new Action({
        payload:
          listState.current.map((value, index) => {
            const indexState = new ModelState(index);
            const keyValue = get(value, key);

            return {
              key: keyValue,
              index: indexState,
              instance: mount(templateState.current, {
                index: indexState,
                data: listState,
                key: keyValue,
                ...others
              })
            };
          }) || [],
        path: 'instanceList init'
      })
    );
  });

  listState.subscribe((action) => {
    // console.log('change::', data.current, instanceList);
    const nextList = listState.current.map((item, index) => ({ key: get(item, key), index }));
    const currentList = modelList.current;
    // reconciliation
    const nextKeyMap = new Map(nextList.map((item) => [item.key, item]));
    const currentKeyMap = new Map(currentList.map((item) => [item.key, item]));

    const nextInstanceList: typeof currentList = [];

    for (const currentNextItem of nextList) {
      const currentItem = currentKeyMap.get(currentNextItem.key);
      if (currentItem) {
        // update
        nextInstanceList.push(currentItem);
        if (currentItem.index.current !== currentNextItem.index) {
          currentItem.index.next(
            action.concat({
              payload: currentNextItem.index,
              path: 'nextInstanceList'
            })
          );
        }
      } else {
        // mount
        const indexState = new ModelState(currentNextItem.index);
        const itemWillMount = {
          index: indexState,
          key: currentNextItem.key,
          instance: mount(templateState.current, {
            index: indexState,
            data: listState,
            key: currentNextItem.key,
            ...others
          })
        };
        nextInstanceList.push(itemWillMount);
        console.log('mount ==> ', itemWillMount.key);
      }
    }

    // unmount
    currentList
      .filter((item) => !nextKeyMap.get(item.key))
      .forEach((node) => {
        console.log('unmount ==> ', node.key);
        unmount(node.instance);
      });

    modelList.next(action.concat({ payload: nextInstanceList, path: 'ListMState' }));
  });

  return {
    listState,
    modelList
  };
}
