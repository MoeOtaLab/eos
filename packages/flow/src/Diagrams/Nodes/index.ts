import { OperatorNode } from './OperatorNode';
import { StateNode } from './StateNode';
import { NodeTypeEnum } from './NodeTypeEnum';

export const nodeTypes: Record<string, any> = {
  OperatorNode,
  [NodeTypeEnum.StateNode]: StateNode,
};
