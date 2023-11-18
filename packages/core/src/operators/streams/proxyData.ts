import { get, set, clone } from 'lodash';
import { ModelState, type ExtraInfo } from '../..';
import { updateValue, type UpdateAction } from '../../ModelState/State';

// todo 重载
export function proxyData<T extends Record<any, any>, Key extends string>(originState: ModelState<T>, key: Key) {
  const defaultData = get<T, Key>(originState.current, key);
  type SubDataType = typeof defaultData;

  class ProxyState extends ModelState<SubDataType> {
    get current() {
      return get(originState.current, key);
    }

    update(updateAction: SubDataType | UpdateAction<SubDataType>, extraInfo: ExtraInfo): void {
      originState.update(data => {
        const currentValue = get(data, key);
        const newData = clone(data);
        const nextValue = updateValue(currentValue, updateAction);
        set(newData, key, nextValue);
        return newData;
      }, extraInfo);
    }

    subscribe(callback: (value: any, extraInfo: ExtraInfo) => any) {
      return originState.subscribe((value, extraInfo) => {
        return callback(get(value, key), extraInfo);
      });
    }
  }

  return new ProxyState(defaultData);
}
