import { type Edge, type Connection } from 'reactflow';

export function getRandomId() {
  return `$flow_${Math.random().toString(36).substr(2, 5)}`;
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
