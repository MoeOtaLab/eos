import { v4 as uuid } from 'uuid';

export class ExtraInfo {
  traceId: string;

  constructor(defaultData?: Partial<ExtraInfo>) {
    Object.assign(this, defaultData || {});
    this.traceId ??= uuid();
  }
}
