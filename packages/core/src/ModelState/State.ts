import { Observable } from './Observable';
import { ExtraInfo } from './ExtraInfo';

export type ReportPayload<T> = {
  traceId: string; // maybe multiple input source.
  operatorId: string;
  current: T;
  next: T;
  reason?: string;
};

type UpdateAction<T> = (source: T) => T;

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
    const nextValue =
      typeof updateAction === 'function'
        ? (updateAction as Function)(this._current)
        : updateAction;
    this._current = nextValue;

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
