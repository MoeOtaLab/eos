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

export interface IMetaOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> {
  /** operator type, unique specifier */
  operatorType: string;
  /** operator name, label for user */
  operatorName: string;
  /** node type for render */
  nodeType: NodeTypeEnum;
  /** options for rendering node */
  nodeOptions?: NodeOptions;
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

export interface IInputOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  // noop to add
}

export interface IOutputOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  // noop to add
}

export interface ICustomOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  layerId: string;
}

export enum StateOperatorValueTypeEnum {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Object = 'object',
}

export interface IStateOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  layerId: string;
  valueType: StateOperatorValueTypeEnum;
  value: string | number | boolean | undefined;
}
