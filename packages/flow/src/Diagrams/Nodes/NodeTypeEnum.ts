export enum NodeTypeEnum {
  /** 状态节点 */
  StateNode = 'StateNode',
  /** 组合节点 */
  CompositionNode = 'CompositionNode',
  /** 流操作 */
  StreamOperatorNode = 'StreamOperatorNode',
  /** 值操作 */
  ValueOperatorNode = 'ValueOperatorNode',
  /**
   * 容器
   * @see https://reactflow.dev/learn/layouting/sub-flows#adding-child-nodes
   * @see https://reactflow.dev/examples/layout/sub-flows
   * */
  ContainerNode = 'ContainerNode',
  CustomNode = 'CustomNode',
  DoNode = 'DoNode',
  Node = 'Node',
}
