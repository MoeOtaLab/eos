import { Atom } from './Atom';
import { Action } from './Action';
import { Dispose } from './Dispose';
import { ModelEvent } from './Event';
import { State } from './State';

const TYPE_LABEL = 'CONTAINER';

type ContainerType = Record<
  string,
  Atom<any> | Action | Dispose | ModelEvent | State
>;

export class Container<T extends ContainerType> extends Atom<T> {
  static isContainer(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }

  constructor(action: T) {
    super(TYPE_LABEL, action);
  }
}
