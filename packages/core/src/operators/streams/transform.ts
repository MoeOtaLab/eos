import { type Atom } from '../../ModelState/State';
import { ModelState } from '../..';

export function transform<StreamValue, ResultValue>(
  steam: Atom<StreamValue>,
  action: (value: StreamValue) => ResultValue,
) {
  return steam.pipe((observer) => {
    const result = new ModelState<ResultValue | undefined>(undefined);

    observer.subscribe((value, extra) => {
      result.update(action(value), extra.concat('transform'));
    });

    return result;
  });
}
