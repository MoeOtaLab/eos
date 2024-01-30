import { get, set, clone } from 'lodash';
import { ModelState } from '../..';
import { updateValue } from '../../ModelState/State';
import { Action } from '../../ModelState';
import { Callback } from '../../ModelState/Observable';

// todo 重载
export function proxyData<T extends Record<any, any>, Key extends string>(
  originState: ModelState<T>,
  key: Key
) {
  const defaultData = get<T, Key>(originState.current, key);
  type SubDataType = typeof defaultData;

  class ProxyState extends ModelState<SubDataType> {
    get current() {
      return get(originState.current, key);
    }

    next(action: Action<SubDataType>): void {
      originState.next(
        action.concat({
          payload: (data: T) => {
            const currentValue = get(data, key);
            const newData = clone(data);
            const nextValue = updateValue(currentValue, action.payload);
            set(newData, key, nextValue);
            return newData;
          },
          path: 'ProxyState'
        })
      );
    }

    subscribe(callback: Callback<SubDataType>) {
      return originState.subscribe((action) => {
        return callback(
          action.concat({
            payload: get(action.payload, key),
            path: 'ProxyState'
          })
        );
      });
    }
  }

  return new ProxyState(defaultData) as ModelState<SubDataType>;
}
