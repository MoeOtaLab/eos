import { StateNode } from './StateNode';
import { InputNode } from './InputNode';
import { OutputNode } from './OutputNode';
import { StreamOperatorNode } from './StreamOperatorNode';
import { CustomNode } from './CustomNode';
import { ContainerNode } from './ContainerNode';
import { DoNode } from './DoNode';
import { NodeTypeEnum } from './NodeTypeEnum';

export const nodeTypes: Record<string, any> = {
  [NodeTypeEnum.StateNode]: StateNode,
  [NodeTypeEnum.InputNode]: InputNode,
  [NodeTypeEnum.OutputNode]: OutputNode,
  [NodeTypeEnum.StreamOperatorNode]: StreamOperatorNode,
  [NodeTypeEnum.CustomNode]: CustomNode,
  [NodeTypeEnum.ContainerNode]: ContainerNode,
  [NodeTypeEnum.DoNode]: DoNode,
};
