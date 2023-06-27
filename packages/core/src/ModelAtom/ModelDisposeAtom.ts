import { Atom } from './Atom';

const TYPE_LABEL = 'DISPOSE';

export class ModelDisposeAtom<
  T extends (...args: any[]) => any = any
> extends Atom<T> {
  static isDispose(atom: Atom<any>) {
    return atom.type === TYPE_LABEL;
  }

  constructor(dispose: T) {
    super(TYPE_LABEL, dispose);
  }

  postUnmount() {
    this.value?.();
  }
}
