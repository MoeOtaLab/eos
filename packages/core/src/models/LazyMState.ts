import { ModelBlockContextType, SetupFn } from '../ModelBlock';
import { Observable } from '../ModelState/Observable';

export function LazyMState<T extends { state: Observable<any>; setup: () => void }>(
  input: T,
  context: ModelBlockContextType
) {
  return {};
}
