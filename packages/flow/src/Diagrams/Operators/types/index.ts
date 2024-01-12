import { type DiagramsContextType } from '../../State/DiagramsProvider';
import { type NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import { v4 as uuid } from 'uuid';

type GetOperatorType<T> = T extends Node<infer P> ? P : any;

export interface IAttributeControlOption<Op extends Node<any>> {
  node: Op;
  actions: Pick<
    DiagramsContextType<GetOperatorType<Op>>,
    'updateEdge' | 'updateNode' | 'setLayer'
  >;
}

export interface IHookOption<Op extends Node<any>> {
  node: Op;
  currentState: Pick<
    DiagramsContextType<GetOperatorType<Op>>,
    'activeLayerId' | 'layer' | 'nodes' | 'edges'
  >;
  actions: Pick<
    DiagramsContextType<GetOperatorType<Op>>,
    'updateEdge' | 'updateNode' | 'setLayer' | 'setActiveLayerId'
  >;
}

export class EndPoint {
  static generateVariableName(hint?: string) {
    return `${hint || 'var'}_${Math.random().toString(36).slice(2, 7)}`;
  }

  static createFromGroup(group: EndPoint) {
    return new EndPoint({
      hint: group.hint,
      ...group?.defaultChildData,
    });
  }

  id: string;
  /** 输入 or 输出 */
  type: 'source' | 'target' | 'group' | 'unknown';
  /** 唯一名称 */
  variableName?: string;
  label?: string;
  hint?: string;
  isConnectable?: boolean;
  children?: IEndPointOption[];
  allowRemove?: boolean;
  allowAddAndRemoveChildren?: boolean;
  variableType?: 'array' | 'object' | 'primary';
  defaultChildData?: Partial<EndPoint>;

  constructor(data: Partial<EndPoint>) {
    Object.assign(this, data);
    this.id ||= uuid();
    this.variableName ||= EndPoint.generateVariableName(this.hint);
    this.type ||= 'unknown';
  }
}

type IEndPointOption = EndPoint;

export interface IMetaOperatorData {
  /** operator type, unique specifier */
  operatorType: string;
  /** operator name, label for user */
  operatorName: string;
  /** node type for render */
  nodeType: NodeTypeEnum;
  /** options for rendering node */
  nodeOptions?: Record<string, any>;
  /** custom label/name for user */
  nodeLabel?: string;
  /** description for node writtern by user */
  comment?: string;
  /** input & output relative */
  endPointOptions?: {
    /** input & output port */
    endPointList?: IEndPointOption[];
  };
}

export interface IInputOperatorData extends IMetaOperatorData {
  // noop to add
}

export interface IOutputOperatorData extends IMetaOperatorData {
  // noop to add
}

export interface ICustomOperatorData extends IMetaOperatorData {
  layerId: string;
}
