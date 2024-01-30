import { type Atom } from '../../ModelState/State';
import { ModelState } from '../..';

export function combine<
  ObservableSubjectList extends Array<Atom<any>>,
  AppendObservableSubjectList extends Array<Atom<any>>
>(streamSource: ObservableSubjectList, appendSource: AppendObservableSubjectList) {
  const result = new ModelState<any[]>([]);

  streamSource.forEach((input) => {
    input.subscribe((action) => {
      const allValue = [...streamSource, ...appendSource].map((item) => item.current);
      result.next(
        action.concat({
          payload: allValue,
          path: 'combine'
        })
      );
    });
  });

  return result;
}
