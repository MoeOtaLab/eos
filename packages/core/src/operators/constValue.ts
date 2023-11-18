import { ModelState } from '../ModelState';

export function constValue<T>(value: T) {
  return new ModelState(value);
}
