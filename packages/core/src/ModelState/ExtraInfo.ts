import { uuid } from '../utils/uuid';

export class ExtraInfo {
  traceId: string;

  constructor(defaultData?: Partial<ExtraInfo>) {
    Object.assign(this, defaultData ?? {});
    this.traceId ??= uuid();
  }
}
