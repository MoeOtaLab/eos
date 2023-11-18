import { uuid } from '../utils/uuid';

export class Entity {
  uid: string;

  constructor(uid?: string) {
    this.uid = uid || uuid();
  }
}
