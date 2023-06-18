import { Atom } from './Atom';

const TYPE_LABEL = 'EVENT';

// TODO;
export class ModelEvent<T extends any = any> extends Atom<T> {
  static isEvent(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }

  constructor(event: T) {
    super(TYPE_LABEL, event);
  }
}
