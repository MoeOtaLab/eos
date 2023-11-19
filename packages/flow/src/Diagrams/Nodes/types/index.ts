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
  operatorName: string;
  label?: string;
  sourcePorts: NodePort[];
  targetPorts: NodePort[];
}

export type IStateNodeData = IBaseNodeData;

export enum StateNodeTypeEnum {
  State = 'State',
  UpdateHanlder = 'UpdateHanlder'
}
