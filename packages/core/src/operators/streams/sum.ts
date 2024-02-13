import { type Atom } from '../../ModelState/ModelState';
import { ModelBlockContextType, ModelState } from '../..';
import { Action } from '../../ModelState';

export function sum<T extends { inputs: Array<Atom<number>> }>(input: T, context: ModelBlockContextType) {
  const { inputs } = input;
  const { onLifecycle } = context;
  const result = new ModelState<number>(0);

  function computed(action: Action<number>, path: string) {
    result.next(
      action.concat({
        payload: inputs.map((input) => input.current).reduce((acc, cur) => acc + cur, 0),
        path
      })
    );
  }

  onLifecycle('postInit', () => {
    computed(new Action<number>({ payload: undefined, path: 'init' }), '[sum]: init');
  });

  inputs.forEach((input) => {
    input.subscribe((action) => {
      computed(action, 'sum');
    });
  });

  return result;
}
