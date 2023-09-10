import { Patch } from 'immer';

export type ValuePayload<T> = {
  value: T;
  traceId: string;
};

export type ReportPayload<T> = {
  traceId: string;
  current: T;
  patches: Patch[];
  inversePatches: Patch[];
  reason?: string;
};
