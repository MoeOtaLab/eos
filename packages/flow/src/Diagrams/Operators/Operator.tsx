import type { ReactNode } from 'react';
import { type NodeProps, type Node } from 'reactflow';
import { getRandomId } from '../utils';
import {
  type IHookOption,
  type IAttributeControlOption,
  type IMetaOperatorData,
} from './types';
import { type IGenerationOption } from '../Compiler';
import { Input } from 'antd';
import { pick } from 'lodash';

export abstract class MetaOperator<
  T extends IMetaOperatorData = IMetaOperatorData,
> {
  // ============ START: Instance Meta Data ============= //
  defaultOperatorData: IMetaOperatorData;

  /** operator type, unique specifier */
  get operatorType() {
    return this.defaultOperatorData?.operatorType;
  }

  /** operator name, label for user */
  get operatorName() {
    return this.defaultOperatorData?.operatorName || this.operatorType;
  }

  // ============ START: Operator Meta Data(static) ============= //
  isUnique?: boolean;
  nodeColor?: string;
  description?: string;
  isCustom?: boolean;

  constructor(defaultOperatorData: IMetaOperatorData) {
    this.defaultOperatorData = defaultOperatorData;
  }

  // ============ START: Instance Operations ============= //
  create(data?: Partial<T>, defaultProps?: Partial<Node<T>>): Node<T> {
    return {
      // 1. should generate the attributes that can modified by user
      // 2. should generate the nodes
      // 3. should generate the ports in graph
      // 4. should generate the funtion which will be used in later code piping
      position: {
        x: 0,
        y: 0,
      },
      ...defaultProps,
      id: defaultProps?.id || getRandomId(),
      type: this.defaultOperatorData.nodeType,
      data: {
        ...this.defaultOperatorData,
        ...defaultProps?.data,
        ...data,
        operatorName: this.defaultOperatorData.operatorName,
        operatorType: this.defaultOperatorData.operatorType,
        nodeType: this.defaultOperatorData.nodeType,
        nodeOptions: this.defaultOperatorData.nodeOptions,
      } as T,
    };
  }

  updateNodeMeta(
    currentNode: Node<T>,
    patch: Omit<Node<T>, 'data' | 'id'>,
  ): Node<T> {
    return {
      ...currentNode,
      ...patch,
      ...pick(currentNode, 'id', 'data'),
    };
  }

  updateData(
    currentNode: Node<T>,
    patch: Partial<
      Omit<
        Node<T>['data'],
        'nodeOptions' | 'nodeType' | 'operatorName' | 'operatorType'
      >
    >,
  ): Node<T> {
    const metaDataPropList: (keyof IMetaOperatorData)[] = [
      'nodeOptions',
      'nodeType',
      'operatorName',
      'operatorType',
    ];

    return {
      ...currentNode,
      data: {
        ...currentNode.data,
        ...patch,
        ...pick(currentNode.data, ...metaDataPropList),
      },
    };
  }

  updateNodeOptions(
    currentNode: Node<T>,
    patch: Partial<Node<T>['data']['nodeOptions']>,
  ): Node<T> {
    return {
      ...currentNode,
      data: {
        ...currentNode?.data,
        nodeOptions: {
          ...currentNode?.data?.nodeOptions,
          ...patch,
        },
      },
    };
  }

  // ============ START: Code Generation ============= //
  abstract generateBlockDeclarations(options: IGenerationOption<T>): string[];

  abstract generateBlockRelation(options: IGenerationOption<T>): string[];

  abstract generateBlockOutput(options: IGenerationOption<T>): string[];

  getIgnoreDegreeIds(node: Node<T>): string[] {
    return [];
  }

  // ============ START: Hooks handler ============= //
  onAfterCreate(options: IHookOption<Node<T>>): void {}

  onNodeFocus(options: IHookOption<Node<T>>) {}

  onNodeDoubleClick(options: IHookOption<Node<T>>) {}

  // ============ START: Panel Relative ============= //
  generateAttributeControl(options: IAttributeControlOption<Node<T>>) {
    const { node, actions } = options;
    function handleChange(val: string) {
      node.data.nodeLabel = val;
      actions.updateNode(node.id, node);
    }
    return (
      <>
        <Input
          placeholder="input label"
          style={{ width: '100%', maxWidth: 'none' }}
          value={node.data.nodeLabel}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </>
    );
  }

  // ============ START: Node Render Relative ============= //
  getNodeProps(currentNode: NodeProps<T>): Record<any, any> {
    return {};
  }

  renderCustomLabel(currentNode: NodeProps<T>): ReactNode {
    return null;
  }
}
