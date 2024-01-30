import { Observable } from './Observable';
import { tracker } from '../Tracker';
import { Action, IUpdateAction } from './Action';

export function updateValue<T>(currentValue: T, updateAction: IUpdateAction<T> | T | undefined) {
  const nextValue =
    typeof updateAction === 'function' ? (updateAction as (...args: any) => any)(currentValue) : updateAction;

  return nextValue;
}

export class Atom<ValueType> extends Observable<ValueType> {
  protected _current: ValueType;

  get current() {
    return this._current;
  }

  constructor(defaultValue: ValueType) {
    super();

    this._current = defaultValue;
    this.next = this.next.bind(this);
  }

  protected next(action: Action<ValueType>) {
    const nextValue = updateValue(this._current, action.payload);
    this._current = nextValue;
    tracker.track({ target: this.uid, action });

    super.trigger(action.concat({ payload: nextValue, path: this.uid }));
  }
}

export class State<ValueType> extends Atom<ValueType> {
  next(action: Action<ValueType>): void {
    super.next(action);
  }
}
