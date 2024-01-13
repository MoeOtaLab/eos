import { type Edge, type Connection } from 'reactflow';
import { v4 as uuid } from 'uuid';

export function getRandomId() {
  return `$flow_${uuid()}`;
}

export function isSameTargetHandle(source: Edge, target: Edge | Connection) {
  return (
    source.target === target.target &&
    source.targetHandle === target.targetHandle
  );
}

export function isSameSourceHandle(source: Edge, target: Edge | Connection) {
  return (
    source.source === target.source &&
    source.sourceHandle === target.sourceHandle
  );
}

export async function sleepMs(milSec: number) {
  return await new Promise((resolve) => setTimeout(resolve, milSec));
}
