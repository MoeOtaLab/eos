import { Atom } from './Atom';
import { ModelComputedState, ModelState } from '../ModelState';

const TYPE_LABEL = 'STATE';

// TODO;
export class ModelStateAtom<T extends any = any> extends Atom<T> {
  static isState(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }

  constructor(state: T) {
    super(TYPE_LABEL, state);
  }
}

export class ModelComputedStateAtom<
  T extends any = any,
  P extends any = any
> extends ModelStateAtom<ModelComputedState<T, P>> {
  private _modelState: () => ModelState<T>;
  constructor(modelState: () => ModelState<T>, computedFn: (value: T) => P) {
    super(new ModelComputedState(computedFn));
    this._modelState = modelState;
  }

  preMount() {
    this.value.setOriginState(this._modelState());
  }
}
