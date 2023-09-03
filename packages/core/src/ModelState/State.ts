import { Patch } from 'immer';

export type ValuePayload<T> = {
  value: T;
  path: {
    current: T;
    id: string;
    reason?: string;
    patches: Patch[];
    inversePatches: Patch[];
  }[];
};
