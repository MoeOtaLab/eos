import { Atom } from './Atom';
import { Action } from './Action';

const TYPE_LABEL = 'LIFECYCLE_ACTION';

export class LifecycleAction<
  T extends (...args: any[]) => any = any
> extends Action<T> {
  static isLifecycleAction(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }
}
