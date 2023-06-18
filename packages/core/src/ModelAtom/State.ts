import { Atom } from './Atom';

const TYPE_LABEL = 'STATE';

// TODO;
export class State<T extends any = any> extends Atom<T> {
  static isState(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }

  constructor(state: T) {
    super(TYPE_LABEL, state);
  }
}
