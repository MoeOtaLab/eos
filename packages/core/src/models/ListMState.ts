import { ModelBlockContextType, SetupFn, InputOutputInterface } from '../ModelBlock';
import { ModelState } from '../ModelState';
import { get } from 'lodash';

export function ListMState<Data extends ModelState<any[]>, Output extends InputOutputInterface>(
  input: {
    data: Data;
    key: string;
    template: ModelState<SetupFn<{ index: ModelState<number>; data: Data; key: string }, Output>>;
  },
  context: ModelBlockContextType
) {
  const { data, key, template } = input;
  const { mount, unmount } = context;

  const instanceList = new ModelState(
    data.current.map((value, index) => {
      const indexState = new ModelState(index);
      const keyValue = get(value, key);

      return {
        key: keyValue,
        index: indexState,
        instance: mount(template.current, { index: indexState, data, key: keyValue })
      };
    }) || []
  );

  data.subscribe((action) => {
    // console.log('change::', data.current, instanceList);
    const nextList = data.current.map((item, index) => ({ key: get(item, key), index }));
    const currentList = instanceList.current;
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
          instance: mount(template.current, { index: indexState, data, key: currentNextItem.key })
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

    instanceList.next(action.concat({ payload: nextInstanceList, path: 'ListMState' }));
  });

  return {
    data,
    instanceList
  };
}
