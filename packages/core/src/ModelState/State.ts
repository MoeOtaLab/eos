import { Observable } from './Observable';
import { type ExtraInfo } from './ExtraInfo';
import { tracker } from '../Tracker';

export interface ReportPayload<T> {
  traceId: string; // maybe multiple input source.
  operatorId: string;
  current: T;
  next: T;
  reason?: string;
}

export type UpdateAction<T> = (source: T) => T;

export function updateValue<T>(currentValue: T, updateAction: UpdateAction<T> | T) {
  const nextValue =
  typeof updateAction === 'function'
    ? (updateAction as (...args: any) => any)(currentValue)
    : updateAction;

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
    this.update = this.update.bind(this);
  }

  protected update(
    updateAction: UpdateAction<ValueType> | ValueType,
    extraInfo: ExtraInfo
  ) {
    const nextValue = updateValue(this._current, updateAction);
    this._current = nextValue;
    tracker.track({ target: this.uid, extraInfo });

    this.next(nextValue, extraInfo);
  }
}

export class State<ValueType> extends Atom<ValueType> {
  update(
    updateAction: ValueType | UpdateAction<ValueType>,
    extraInfo: ExtraInfo
  ): void {
    super.update(updateAction, extraInfo);
  }
}
