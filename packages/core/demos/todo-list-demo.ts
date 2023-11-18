import { type ModelBlockContextType, ModelState } from '../src';
import { proxyData, mountList } from '../src/operators';
import { ExtraInfo } from '../src/ModelState/ExtraInfo';

function TodoItem(input: { index: ModelState<number>; data: ModelState<any[]>; key: string }, context: ModelBlockContextType) {
  const { index, data, key } = input;
  const { onLifecycle } = context;

  onLifecycle('mount', () => {
    console.log('mount', 'TodoItem', key, data.current[index.current]);
  });

  onLifecycle('unmount', () => {
    console.log('unmount', 'TodoItem', key, data.current[index.current]);
  });

  return {
    index,
    data,
  };
}

function TodoListContainer(input: { listData: ModelState<any[]>; key: string }, context: ModelBlockContextType) {
  const { listData, key } = input;

  const { instanceList } = mountList({ data: listData, key }, context, TodoItem);

  return {
    instanceList,
  };
}

export function TodoListDemoApp(_input: any, context: ModelBlockContextType) {
  const { mount } = context;
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

  return {
    data,
    todoListContainerInstance,
  };
}
