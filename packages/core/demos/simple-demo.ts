import { ModelState, type ModelBlockContextType, ModelEvent } from '../src';
import { constValue, sum } from '../src/operators';

export function SimpleDemoApp(input: any, context: ModelBlockContextType) {
  const state1 = new ModelState(0);
  const state2 = new ModelState(0);

  const event = new ModelEvent<number>();

  const result = sum(
    {
      inputs: [sum({ inputs: [state1, state2] }, context), constValue(6)]
    },
    context
  );

  sum(
    {
      inputs: [
        event.pipe((item) => {
          const value = new ModelState<number>(0);

          item.subscribe((action) => {
            value.next(action);
          });

          return value;
        }),
        constValue(1)
      ]
    },
    context
  ).subscribe((action) => {
    state2.next(action);
  });

  return {
    result,
    event
  };
}
