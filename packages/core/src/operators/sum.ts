import { type Atom } from '../ModelState/State';
import { ModelState } from '../ModelState';
import { ExtraInfo } from '../ModelState/ExtraInfo';

export function sum<ObservableSubjectList extends Array<Atom<number>>>(...inputs: ObservableSubjectList) {
  const result = new ModelState<number>(0);

  function computed(extraInfo: ExtraInfo) {
    result.update(inputs.map(input => input.current).reduce((acc, cur) => acc + cur, 0), extraInfo);
  }

  computed(new ExtraInfo('[sum]: init'));

  inputs.forEach(input => {
    input.subscribe((_value, extraInfo) => {
      computed(extraInfo.concat('sum'));
    });
  });

  return result;
}
