import { Atom } from './Atom';

const TYPE_LABEL = 'CONTAINER';

export class ModelContainerAtom<
  T extends () => Record<string, Atom<any>>
> extends Atom<Record<string, Atom<any>>> {
  static isContainer(atom: Atom<any>): atom is ModelContainerAtom<any> {
    return atom.type === TYPE_LABEL;
  }

  constructor(fn: T) {
    super(TYPE_LABEL, fn());
  }
}
