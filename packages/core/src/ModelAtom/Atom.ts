export class Atom<T> {
  type: string;

  current: T;

  constructor(type: string, value: T) {
    this.type = type;
    this.current = value;
  }

  // hooks into model block
  postInit() {
    // ..
  }

  preMount() {
    // ..
  }

  postMount() {
    // ..
  }

  beforeMount() {
    // ..
  }

  mount() {
    // ..
  }

  beforeUnmount() {
    // ..
  }

  unmount() {
    // ..
  }

  preUnmount() {
    // ..
  }

  postUnmount() {
    // ..
  }
}
