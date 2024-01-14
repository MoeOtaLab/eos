import { type Atom } from '../../ModelState/State';
import { ModelState } from '../..';

export function combine<
  ObservableSubjectList extends Array<Atom<any>>,
  AppendObservableSubjectList extends Array<Atom<any>>,
>(
  streamSource: ObservableSubjectList,
  appendSource: AppendObservableSubjectList,
) {
  const result = new ModelState<any[]>([]);

  streamSource.forEach((input) => {
    input.subscribe((_value, extraInfo) => {
      const allValue = [...streamSource, ...appendSource].map(
        (item) => item.current,
      );
      result.update(allValue, extraInfo.concat('combine'));
    });
  });

  return result;
}
