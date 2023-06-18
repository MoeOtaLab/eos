export class Atom<T> {
  type: string;

  value: T;

  constructor(type: string, value: T) {
    this.type = type;
    this.value = value;
  }
}
