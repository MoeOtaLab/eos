import { ExtraInfo } from './ExtraInfo';
import { Observable } from './Observable';

export class ModelEvent<T> extends Observable<T> {
  next(info: T, extraInfo: ExtraInfo) {
    super.next(info, extraInfo || new ExtraInfo('[ModelEvent] fallback'));
  }
}
