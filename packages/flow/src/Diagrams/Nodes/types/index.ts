import { v4 as uuid } from 'uuid';

export class NodePort {
  id: string;
  type: string;
  label: string = '';
  isConnectable?: boolean;
  children?: NodePort[];

  constructor(data: Partial<NodePort>) {
    Object.assign(this, data);
    this.id ??= uuid();
    this.type ??= 'unknown port type';
  }
}

export interface IBaseNodeData {
  /** 类型唯一标识 */
  operatorType: string;
  /** 可以修改 */
  operatorName: string;
  label?: string;
  description?: string;
  sourcePorts: NodePort[];
  targetPorts: NodePort[];
}

export type IStreamOperatorNodeData = IBaseNodeData & {
  allowAddTargetPort?: boolean;
};
