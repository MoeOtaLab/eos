import { StateNode } from './StateNode';
import { InputNode } from './InputNode';
import { OutputNode } from './OutputNode';
import { StreamOperatorNode } from './StreamOperatorNode';
import { CustomNode } from './CustomNode';
import { NodeTypeEnum } from './NodeTypeEnum';

export const nodeTypes: Record<string, any> = {
  [NodeTypeEnum.StateNode]: StateNode,
  [NodeTypeEnum.InputNode]: InputNode,
  [NodeTypeEnum.OutputNode]: OutputNode,
  [NodeTypeEnum.StreamOperatorNode]: StreamOperatorNode,
  [NodeTypeEnum.CustomNode]: CustomNode,
};