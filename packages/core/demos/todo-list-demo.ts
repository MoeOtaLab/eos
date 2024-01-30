import { type ModelBlockContextType, ModelState, ModelEvent } from '../src';
import { proxyData, mountList } from '../src/operators';
import { Action } from '../src/ModelState';

function TodoItem(
  input: { index: ModelState<number>; data: ModelState<any[]>; key: string },
  context: ModelBlockContextType
) {
  const { index, data, key } = input;
  const { onLifecycle } = context;

  // delete
  // change title
  // check/uncheck
  const deleteEvent = new ModelEvent<undefined>();
  const titleChangeEvent = new ModelEvent<string>();
  const checkEvent = new ModelEvent<boolean>();

  deleteEvent.subscribe((action) => {
    data.next(
      action.concat({
        payload: (data: any[]) => {
          const dataWillUpdate = [...data];
          dataWillUpdate.splice(index.current, 1);
          return dataWillUpdate;
        },
        path: 'deleteEvent'
      })
    );
  });

  titleChangeEvent.subscribe((action) => {
    data.next(
      action.concat({
        payload: (data: any[]) => {
          const dataWillUpdate = [...data];
          const item = data[index.current];
          item.title = action.payload;
          return dataWillUpdate;
        },
        path: 'titleChangeEvent'
      })
    );
  });

  checkEvent.subscribe((action) => {
    data.next(
      action.concat({
        payload: (data: any[]) => {
          const dataWillUpdate = [...data];
          const item = data[index.current];
          item.checked = Boolean(action.payload);
          return dataWillUpdate;
        },
        path: 'checkEvent'
      })
    );
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
    checkEvent
  };
}

function TodoListContainer(
  input: { listData: ModelState<any[]>; key: string },
  context: ModelBlockContextType
) {
  const { listData, key } = input;

  const { instanceList } = mountList({ data: listData, key }, context, TodoItem);

  // add item
  // check/uncheck all
  // clear
  const addItemEvent = new ModelEvent<{ key: string; title: string }>();
  const checkAllEvent = new ModelEvent<boolean>();
  const clearAllEvent = new ModelEvent<boolean>();

  addItemEvent.subscribe((action) => {
    listData.next(
      action.concat({
        payload: (list: any[]) => {
          return list.concat({
            ...action.payload,
            checked: false
          });
        },
        path: 'addItemEvent'
      })
    );
  });

  checkAllEvent.subscribe((action) => {
    listData.next(
      action.concat({
        payload: (list: any[]) => {
          return list.map((item) => ({
            ...item,
            checked: Boolean(action.payload)
          }));
        },
        path: 'checkAllEvent'
      })
    );
  });

  clearAllEvent.subscribe((action) => {
    listData.next(action.concat({ payload: [], path: 'clearAllEvent' }));
  });

  return {
    addItemEvent,
    checkAllEvent,
    clearAllEvent,
    instanceList
  };
}

export function TodoListDemoApp(_input: any, context: ModelBlockContextType) {
  const { mount, onLifecycle } = context;
  const data = new ModelState({ list: [{ key: 1 }] });
  const listData = proxyData(data, 'list');

  listData.next(
    new Action({
      payload: (list) => [...(list || []), { key: 777 }],
      path: 'update list'
    })
  );

  setTimeout(() => {
    listData.next(
      new Action({
        payload: (list) => [{ key: 777 }, { key: 99 }],
        path: 'update list'
      })
    );
  }, 1000);

  console.log('listData', listData.current);
  console.log('data', data.current);

  const todoListContainerInstance = mount(TodoListContainer, {
    listData,
    key: 'key'
  });

  onLifecycle('mount', () => {
    setTimeout(() => {
      // 增加一个
      todoListContainerInstance.output?.addItemEvent.next(
        new Action({
          payload: { key: '23333', title: 'new item' },
          path: 'add manually'
        })
      );
      console.log('listData addItemEvent', listData.current);
      todoListContainerInstance.output?.checkAllEvent.next(
        new Action({
          payload: true,
          path: 'listData checkAllEvent true'
        })
      );
      console.log('listData checkAllEvent true', listData.current);
      todoListContainerInstance.output?.checkAllEvent.next(
        new Action({
          payload: false,
          path: 'listData checkAllEvent false'
        })
      );
      console.log('listData checkAllEvent false', listData.current);

      // change title
      todoListContainerInstance.output?.instanceList?.current?.at(-1)?.instance.output?.titleChangeEvent.next(
        new Action({
          payload: 'change - title',
          path: 'listData titleChangeEvent'
        })
      );
      console.log('listData titleChangeEvent', listData.current);

      todoListContainerInstance.output?.instanceList?.current?.at(-1)?.instance.output?.checkEvent.next(
        new Action({
          payload: true,
          path: 'listData checkEvent true'
        })
      );
      console.log('listData checkEvent true', listData.current);

      todoListContainerInstance.output?.instanceList?.current?.at(-2)?.instance.output?.deleteEvent.next(
        new Action({
          payload: undefined,
          path: 'listData deleteEvent'
        })
      );
      console.log('listData deleteEvent', listData.current);

      todoListContainerInstance.output?.clearAllEvent.next(
        new Action({
          payload: false,
          path: 'listData clearAllEvent'
        })
      );
      console.log('listData clearAllEvent', listData.current);
    }, 3000);
  });

  return {
    data,
    todoListContainerInstance
  };
}
