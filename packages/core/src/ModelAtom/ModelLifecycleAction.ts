import { Atom } from './Atom';
import { AtomLifecycleEventType } from '../ModelBlock/ModelBlock';

const TYPE_LABEL = 'LIFECYCLE_ACTION';

export class ModelLifecycleAction<
  T extends (...args: any[]) => any = any
> extends Atom<T> {
  lifecycle: AtomLifecycleEventType;

  static isLifecycleAction(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }

  constructor(lifecycle: AtomLifecycleEventType, fn: T) {
    super(TYPE_LABEL, fn);
    this.lifecycle = lifecycle;

    const allowLifecycleList: AtomLifecycleEventType[] = [
      'postInit',
      'postMount',
      'preMount',
      'postUnmount',
      'preUnmount',
    ];

    if (allowLifecycleList.includes(lifecycle)) {
      this[lifecycle] = () => {
        fn();
      };
    }
  }
}
