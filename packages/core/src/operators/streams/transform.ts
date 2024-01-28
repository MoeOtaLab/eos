import { type Atom } from '../../ModelState/State';
import { ModelState } from '../..';

export function transform<StreamValue, ResultValue>(
  steam: Atom<StreamValue>,
  action: (value: StreamValue) => ResultValue
) {
  return steam.pipe((observer) => {
    const result = new ModelState<ResultValue | undefined>(undefined);

    observer.subscribe(async (value, extra) => {
      const actionResult = action(value);
      let resultValue = actionResult;
      if (actionResult instanceof Promise) {
        resultValue = await actionResult;
      }
      result.update(resultValue, extra.concat('transform'));
    });

    return result;
  });
}
