import { Entity } from '../Entity';

export class ExtraInfo extends Entity {
  hint: string[] = [];

  constructor(
    defaultDataOrHint?: ExtraInfo['hint'][number] | Partial<ExtraInfo>,
  ) {
    super(
      typeof defaultDataOrHint === 'object'
        ? defaultDataOrHint?.uid
        : undefined,
    );
    if (typeof defaultDataOrHint === 'string') {
      // hint
      this.hint = [defaultDataOrHint];
    } else {
      Object.assign(this, defaultDataOrHint ?? {});
    }
  }

  concat(hint: string) {
    this.hint.push(hint);
    return this;
  }
}
