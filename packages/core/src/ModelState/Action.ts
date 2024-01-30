import { Entity } from '../Entity';

export type IUpdateAction<T> = (source: T) => T;

type IActionObjectParam<T extends Action = Action> = Required<Pick<T, 'payload' | 'path'>> &
  Partial<Pick<T, 'uid' | 'from' | 'extra'>>;

export class Action<T = any, ExtraData extends Record<string, any> = Record<string, any>> extends Entity {
  /** UpdateAction, value or function */
  payload: T | IUpdateAction<T> | undefined;
  /** value update hint */
  path: string = '';
  /** extra data */
  extra?: ExtraData;
  /** prev id */
  from?: string[];

  static create(defaultAction: IActionObjectParam, relativeAction?: Action) {
    const action = new Action(defaultAction);
    action.from = action?.from || [];
    if (relativeAction?.uid) {
      action.from = action.from.concat(relativeAction?.uid || '');
    }
    action.extra = 'extra' in defaultAction ? defaultAction?.extra : relativeAction?.extra;
    return action;
  }

  constructor(defaultDataOrAction: IActionObjectParam<Action<T, ExtraData>>) {
    super(defaultDataOrAction?.uid);
    Object.assign(this, defaultDataOrAction);
  }

  concat(defaultAction: IActionObjectParam) {
    return Action.create(defaultAction, this);
  }
}
