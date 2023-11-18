import { type ModelBlockContextType, ModelState, ModelEvent } from '../src';
import { proxyData, mountList } from '../src/operators';
import { ExtraInfo } from '../src/ModelState/ExtraInfo';

function TodoItem(input: { index: ModelState<number>; data: ModelState<any[]>; key: string }, context: ModelBlockContextType) {
  const { index, data, key } = input;
  const { onLifecycle } = context;

  // delete
  // change title
  // check/uncheck
  const deleteEvent = new ModelEvent();
  const titleChangeEvent = new ModelEvent();
  const checkEvent = new ModelEvent<boolean>();

  deleteEvent.subscribe((_val, extraInfo) => {
    data.update(data => {
      const dataWillUpdate = [...data];
      dataWillUpdate.splice(index.current, 1);
      return dataWillUpdate;
    }, extraInfo);
  });

  titleChangeEvent.subscribe((val, extraInfo) => {
    data.update(data => {
      const dataWillUpdate = [...data];
      const item = data[index.current];
      item.title = val;
      return dataWillUpdate;
    }, extraInfo);
  });

  checkEvent.subscribe((val, extraInfo) => {
    data.update(data => {
      const dataWillUpdate = [...data];
      const item = data[index.current];
      item.checked = Boolean(val);
      return dataWillUpdate;
    }, extraInfo);
  });

  onLifecycle('mount', () => {
    console.log('mount', 'TodoItem', key, data.current[index.current]);
  });

  onLifecycle('unmount', () => {
    console.log('unmount', 'TodoItem', key, data.current[index.current]);
  });

  return {
    index,
    data,
    deleteEvent,
    titleChangeEvent,
    checkEvent,
  };
}

function TodoListContainer(input: { listData: ModelState<any[]>; key: string }, context: ModelBlockContextType) {
  const { listData, key } = input;

  const { instanceList } = mountList({ data: listData, key }, context, TodoItem);

  // add item
  // check/uncheck all
  // clear
  const addItemEvent = new ModelEvent<{ key: string; title: string }>();
  const checkAllEvent = new ModelEvent<boolean>();
  const clearAllEvent = new ModelEvent();

  addItemEvent.subscribe((val, extraInfo) => {
    listData.update(list => {
      return list.concat({
        ...val,
        checked: false,
      });
    }, extraInfo);
  });

  checkAllEvent.subscribe((val, extraInfo) => {
    listData.update(list => {
      return list.map(item => ({
        ...item,
        checked: Boolean(val),
      }));
    }, extraInfo);
  });

  clearAllEvent.subscribe((_val, extraInfo) => {
    listData.update([], extraInfo);
  });

  return {
    addItemEvent,
    checkAllEvent,
    clearAllEvent,
    instanceList,
  };
}

export function TodoListDemoApp(_input: any, context: ModelBlockContextType) {
  const { mount, onLifecycle } = context;
  const data = new ModelState({ list: [{ key: 1 }] });
  const listData = proxyData(data, 'list');

  listData.update(list => [
    ...(list || []),
    { key: 777 },
  ], new ExtraInfo('update list'));

  setTimeout(() => {
    listData.update(list => [
      { key: 777 },
      { key: 99 },
    ], new ExtraInfo('update list'));
  }, 1000);

  console.log('listData', listData.current);
  console.log('data', data.current);

  const todoListContainerInstance = mount(TodoListContainer, { listData, key: 'key' });

  onLifecycle('mount', () => {
    setTimeout(() => {
      // 增加一个
      todoListContainerInstance.output?.addItemEvent.next({ key: '23333', title: 'new item' }, new ExtraInfo('add manually'));
      console.log('listData addItemEvent', listData.current);
      todoListContainerInstance.output?.checkAllEvent.next(true, new ExtraInfo('listData checkAllEvent true'));
      console.log('listData checkAllEvent true', listData.current);
      todoListContainerInstance.output?.checkAllEvent.next(false, new ExtraInfo('listData checkAllEvent false'));
      console.log('listData checkAllEvent false', listData.current);

      // change title
      todoListContainerInstance.output?.instanceList?.current?.at(-1)?.instance.output?.titleChangeEvent.next('change - title', new ExtraInfo('listData titleChangeEvent'));
      console.log('listData titleChangeEvent', listData.current);

      todoListContainerInstance.output?.instanceList?.current?.at(-1)?.instance.output?.checkEvent.next(true, new ExtraInfo('listData checkEvent true'));
      console.log('listData checkEvent true', listData.current);

      todoListContainerInstance.output?.instanceList?.current?.at(-2)?.instance.output?.deleteEvent.next(undefined, new ExtraInfo('listData deleteEvent'));
      console.log('listData deleteEvent', listData.current);

      todoListContainerInstance.output?.clearAllEvent.next(false, new ExtraInfo('listData clearAllEvent'));
      console.log('listData clearAllEvent', listData.current);
    }, 3000);
  });

  return {
    data,
    todoListContainerInstance,
  };
}
