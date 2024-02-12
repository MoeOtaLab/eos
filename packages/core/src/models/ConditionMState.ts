import { ModelBlock, ModelBlockContextType, SetupFn } from '../ModelBlock';
import { Action, ModelState } from '../ModelState';
import { Observable } from '../ModelState/Observable';

export function ConditionMState<
  T extends {
    state: Observable<boolean>;
    templateState: ModelState<SetupFn<{ index: ModelState<number>; data: T['state']; key: string }, any>>;
  }
>(input: T, context: ModelBlockContextType) {
  const { state, templateState, ...others } = input;
  const { mount, onLifecycle } = context;

  const modelState = new ModelState<ModelBlock<any, any> | undefined>(undefined);

  onLifecycle('postInit', () => {
    const subscription = state.subscribe((action) => {
      if (modelState.current) {
        modelState.current.unmount();
      }

      if (action.payload) {
        modelState.next(
          new Action({
            // TODO: fix ts
            payload: mount(templateState.current, { ...others } as any) as any,
            path: 'ConditionMState mount'
          })
        );
      } else if (modelState.current) {
        modelState.next(
          new Action({
            // TODO: fix ts
            payload: undefined as any,
            path: 'ConditionMState mount'
          })
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  return {
    // remain state structure, use custom/group operator to do the rest logic
    modelState
  };
}
