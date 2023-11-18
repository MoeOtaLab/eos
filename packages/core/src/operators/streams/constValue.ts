import { ModelState } from '../..';

export function constValue<T>(value: T) {
  return new ModelState(value);
}
