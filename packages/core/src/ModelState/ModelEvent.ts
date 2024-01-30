import { Observable } from './Observable';
import { Action } from './Action';

export class ModelEvent<T> extends Observable<T> {
  next(action?: Action<T>) {
    super.trigger(action || new Action<T>({ payload: undefined, path: 'event' }));
  }
}
