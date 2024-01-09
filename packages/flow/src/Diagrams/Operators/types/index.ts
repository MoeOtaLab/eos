import { type DiagramsContextType } from '../../State/DiagramsProvider';
import { type NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';

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

export interface IMetaOperatorData {
  /** operator 唯一标识 */
  operatorType: string;
  /** operator 展示名称 */
  operatorName: string;
  /** 渲染的类型 */
  nodeType: NodeTypeEnum;
  /** 渲染配置 */
  nodeOptions?: Record<string, any>;
  /** 自定义名称 */
  nodeLabel?: string;
}
