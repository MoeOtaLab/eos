import { type Atom } from '../../ModelState/State';
import { ModelState } from '../..';

export function merge<ObservableSubjectList extends Array<Atom<any>>>(streamSource: ObservableSubjectList) {
  const result = new ModelState<any[]>([]);

  streamSource.forEach((input) => {
    input.subscribe((value, extraInfo) => {
      result.update(value, extraInfo.concat('combine'));
    });
  });

  return result;
}
