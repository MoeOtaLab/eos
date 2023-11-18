import { get } from 'lodash';
import { ModelState, type ModelBlockContextType, type SetupFn } from '..';

export function mountList<Data extends ModelState<any[]>, Template extends SetupFn<{ index: ModelState<number>; data: Data; key: string }, any>>(input: { data: Data; key: string }, context: ModelBlockContextType, template: Template) {
  const { data, key } = input;
  const { mount, unmount } = context;

  const instanceList = new ModelState(data.current.map((value, index) => {
    const indexState = new ModelState(index);
    const keyValue = get(value, key);

    return {
      key: keyValue,
      index: indexState,
      instance: mount(template, { index: indexState, data, key: keyValue }),
    };
  }) || []);

  data.subscribe((_val, extraInfo) => {
    const nextList = data.current.map((item, index) => ({ key: get(item, key), index }));
    const currentList = instanceList.current;
    // reconciliation
    const nextKeyMap = new Map(nextList.map(item => [
      item.key,
      item,
    ]));
    const currentKeyMap = new Map(currentList.map(item => [
      item.key,
      item,
    ]));

    const nextInstanceList: typeof currentList = [];

    for (const currentNextItem of nextList) {
      const currentItem = currentKeyMap.get(currentNextItem.key);
      if (currentItem) {
        // update
        nextInstanceList.push(currentItem);
        if (currentItem.index.current !== currentNextItem.index) {
          currentItem.index.update(currentNextItem.index, extraInfo);
        }
      } else {
        // mount
        const indexState = new ModelState(currentNextItem.index);
        const itemWillMount = {
          index: indexState,
          key: currentNextItem.key,
          instance: mount(template, { index: indexState, data, key: currentNextItem.key }),
        };
        nextInstanceList.push(itemWillMount);
      }
    }

    // unmount
    currentList.filter(item => !nextKeyMap.get(item.key)).forEach(node => {
      console.log('unmount ==> ', node.key);
      unmount(node.instance);
    });

    instanceList.update(currentList, extraInfo);
  });

  return {
    data,
    instanceList,
  };
}
