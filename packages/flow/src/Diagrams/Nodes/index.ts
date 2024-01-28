import { Node } from './Node';
import { NodeTypeEnum } from './NodeTypeEnum';

export const nodeTypes: Record<string, any> = {
  [NodeTypeEnum.Node]: Node
};
