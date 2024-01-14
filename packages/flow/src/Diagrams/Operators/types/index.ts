import { type DiagramsContextType } from '../../State/DiagramsProvider';
import { type NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type NodeProps, type Node } from 'reactflow';
import { v4 as uuid } from 'uuid';

type GetOperatorStateType<T> = T extends Node<infer P>
  ? P
  : T extends NodeProps<infer Y>
    ? Y
    : unknown;

export interface IAttributeControlOption<OpNode extends Node<any>> {
  node: OpNode;
  actions: Pick<
    DiagramsContextType<GetOperatorStateType<OpNode>>,
    'updateEdge' | 'updateNode' | 'setLayer'
  >;
}

export interface IHookOption<OpNode extends Node<any> | NodeProps<any>> {
  node: Omit<OpNode, 'position'>;
  currentState: Pick<
    DiagramsContextType<GetOperatorStateType<OpNode>>,
    'activeLayerId' | 'layer' | 'nodes' | 'edges'
  >;
  actions: Pick<
    DiagramsContextType<GetOperatorStateType<OpNode>>,
    'updateEdge' | 'updateNode' | 'setLayer' | 'setActiveLayerId' | 'setEdges'
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

export interface ISumOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  // noop
}

export interface ICombineOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  // noop
}

export interface ITranformOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  customCode?: string;
}

export interface IEffectOperatorData<
  NodeOptions extends Record<string, any> = Record<string, any>,
> extends IMetaOperatorData<NodeOptions> {
  // noop
}
