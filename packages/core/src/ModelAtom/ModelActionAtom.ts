import { Atom } from './Atom';

const TYPE_LABEL = 'ACTION';

export class ModelActionAtom<
  T extends (...args: any[]) => any = any
> extends Atom<T> {
  static isAction(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }

  constructor(action: T) {
    super(TYPE_LABEL, action);
  }
}
