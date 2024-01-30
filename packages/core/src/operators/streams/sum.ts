import { type Atom } from '../../ModelState/State';
import { ModelState } from '../..';
import { Action } from '../../ModelState';

export function sum<ObservableSubjectList extends Array<Atom<number>>>(...inputs: ObservableSubjectList) {
  const result = new ModelState<number>(0);

  function computed(action: Action<number>, path: string) {
    result.next(
      action.concat({
        payload: inputs.map((input) => input.current).reduce((acc, cur) => acc + cur, 0),
        path
      })
    );
  }

  computed(new Action<number>({ payload: undefined, path: 'init' }), '[sum]: init');

  inputs.forEach((input) => {
    input.subscribe((action) => {
      computed(action, 'sum');
    });
  });

  return result;
}
