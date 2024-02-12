import { type Atom } from '../../ModelState/ModelState';
import { ModelState } from '../..';

export function transform<StreamValue, ResultValue>(
  steam: Atom<StreamValue>,
  actionFn: (value: StreamValue) => ResultValue
) {
  return steam.pipe((observer) => {
    const result = new ModelState<ResultValue | undefined>(undefined);

    observer.subscribe(async (action) => {
      const actionResult = actionFn(action.payload as StreamValue);
      let resultValue = actionResult;
      if (actionResult instanceof Promise) {
        resultValue = await actionResult;
      }
      result.next(
        action.concat({
          payload: resultValue,
          path: 'transform'
        })
      );
    });

    return result;
  });
}
