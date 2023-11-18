import { uuid } from '../utils/uuid';

export class ExtraInfo {
  traceId: string;
  hint?: string;

  constructor(defaultDataOrHint?: ExtraInfo['hint'] | Partial<ExtraInfo>) {
    if (typeof defaultDataOrHint === 'string') {
      // hint
      this.hint = defaultDataOrHint;
    } else {
      Object.assign(this, defaultDataOrHint ?? {});
    }

    this.traceId ??= uuid();
  }
}
