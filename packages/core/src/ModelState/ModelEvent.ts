import { type ExtraInfo } from './ExtraInfo';
import { Observable } from './Observable';

export class ModelEvent<T> extends Observable<T> {
  next(info: T, extraInfo: ExtraInfo) {
    super.next(info, extraInfo);
  }
}
