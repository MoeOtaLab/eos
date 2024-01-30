import { type Atom } from '../../ModelState/State';
import { ModelState } from '../..';

export function merge<ObservableSubjectList extends Array<Atom<any>>>(streamSource: ObservableSubjectList) {
  const result = new ModelState<any[]>([]);

  streamSource.forEach((input) => {
    input.subscribe((action) => {
      result.next(
        action.concat({
          payload: action.payload,
          path: 'merge'
        })
      );
    });
  });

  return result;
}
