import { type Edge, type Node } from 'reactflow';
import { OperatorMap, getOperatorFromNode } from '../Operators';
import { type IBaseNodeData } from '../Nodes/types';
import { EosCoreSymbol } from './runtime';
import { type Layer, flatLayer } from '../State/Layer';
import { message } from 'antd';

export interface IConnection {
  nodeId: string;
  handleId: string;
  relatedHandleId: string;
}

export class NodeGraph {
  edges: Edge[];
  nodes: Node[];
  nodeMap: Map<string, Node>;

  connections: Map<
    Node<any>['id'],
    {
      incoming: IConnection[];
      outcoming: IConnection[];
    }
  >;

  constructor(nodes: Node[], edges: Edge[]) {
    this.edges = edges || [];
    this.nodes = nodes || [];
    this.nodeMap = new Map(nodes.map((item) => [item.id, item]));
    this.connections = this.initialRelation();
  }

  initialRelation() {
    const connections: NodeGraph['connections'] = new Map();

    for (const edge of this.edges) {
      if (
        !edge.target ||
        !edge.source ||
        !edge?.targetHandle ||
        !edge?.sourceHandle
      ) {
        console.warn('found useless target/source edge: ', edge);
        continue;
      }

      let sourceConnnection = connections.get(edge.source);
      if (!sourceConnnection) {
        sourceConnnection = {
          incoming: [],
          outcoming: [],
        };
      }

      sourceConnnection.outcoming.push({
        nodeId: edge.target,
        handleId: edge.sourceHandle,
        relatedHandleId: edge.targetHandle,
      });

      connections.set(edge.source, sourceConnnection);

      let targetConnection = connections.get(edge.target);
      if (!targetConnection) {
        targetConnection = {
          incoming: [],
          outcoming: [],
        };
      }
      targetConnection.incoming.push({
        nodeId: edge.source,
        handleId: edge.targetHandle,
        relatedHandleId: edge.sourceHandle,
      });

      connections.set(edge.target, targetConnection);

      // if (sourceConnnection.incoming?.length > 1) {
      //   console.warn('found duplicate input source: ', sourceConnnection);
      // }

      // if (targetConnection.incoming?.length > 1) {
      //   console.warn('found duplicate input source: ', targetConnection);
      // }
    }

    return connections;
  }

  /** 上游 */
  findSourceNodes(nodeId: string) {
    return this.connections.get(nodeId)?.incoming;
  }

  /** 下游 */
  findTargetNodes(nodeId: string) {
    return this.connections.get(nodeId)?.outcoming;
  }

  getSortedNodes() {
    const result: Node[] = [];
    const degreeMap = new Map<string, number>();

    // init degree
    for (const edge of this.edges) {
      if (edge.source && edge.target) {
        const currentDegree = degreeMap.get(edge.target) || 0;
        degreeMap.set(edge.target, currentDegree + 1);
      }
    }

    // find degree-0 nodes
    const queue: (Node | undefined)[] = this.nodes.filter(
      (item) => !degreeMap.get(item.id),
    );

    while (queue?.length) {
      const node = queue.pop();
      if (!node) {
        continue;
      }

      result.push(node);
      const outcoming = this.connections.get(node?.id)?.outcoming || [];
      outcoming.forEach((connection) => {
        const currentDegree = degreeMap.get(connection.nodeId);
        if (currentDegree) {
          degreeMap.set(connection.nodeId, currentDegree - 1);
          if (currentDegree - 1 === 0) {
            queue.push(this.nodeMap.get(connection.nodeId));
          }
        }
      });
    }

    // 如果存在循环的场景
    if (result.length !== this.nodes.length) {
      console.log('====== Circle ======', { result, nodes: this.nodes });
      message.info('存在循环');
    }

    return result;
  }
}

export interface IGenerationOption<T = any> {
  node: Node<T>;
  nodeGraph: NodeGraph;
  formatVariableName: typeof formatVariableName;
  formatBlockVarName: typeof formatBlockVarName;
}

export function formatVariableName(id: string) {
  return `var_${id.replaceAll('-', '_').replaceAll('$', '__')}`;
}

function formatBlockVarName(containerId: string) {
  return `block_${formatVariableName(containerId)}`;
}
function generateBlock(
  containerId: string,
  data: { nodes: Node[]; edges: Edge[] },
) {
  const { nodes, edges } = data;
  const nodeGraph = new NodeGraph(nodes, edges);

  const sortedNode = nodeGraph.getSortedNodes();

  const declarations: string[] = sortedNode
    .map((node: Node<IBaseNodeData>) => {
      const Operator =
        getOperatorFromNode(node) || OperatorMap.get(node.data.operatorName);
      return Operator?.generateBlockDeclarations?.({
        node,
        nodeGraph,
        formatVariableName,
        formatBlockVarName,
      });
    })
    .flat()
    .filter((x): x is string => Boolean(x));

  const relations: string[] = sortedNode
    .map((node: Node<IBaseNodeData>) => {
      const Operator =
        getOperatorFromNode(node) || OperatorMap.get(node.data.operatorName);
      return Operator?.generateBlockRelation?.({
        node,
        nodeGraph,
        formatVariableName,
        formatBlockVarName,
      });
    })
    .flat()
    .filter((x): x is string => Boolean(x));

  const outputs: string[] = sortedNode
    .map((node: Node<IBaseNodeData>) => {
      const Operator =
        getOperatorFromNode(node) || OperatorMap.get(node.data.operatorName);
      return Operator?.generateBlockOutput?.({
        node,
        nodeGraph,
        formatVariableName,
        formatBlockVarName,
      });
    })
    .flat()
    .filter((x): x is string => Boolean(x));

  const output = `
    function ${formatBlockVarName(containerId)}(input, context) {
      ${declarations.join(';\n')}
      ${relations.join(';\n')}
      return {
        ${outputs?.join(',\n')}
      }
    }
  `;

  return output;
}

function generateContainer(appContainerId: string, data: { layer: Layer }) {
  const { layer } = data;
  const containers = flatLayer(data.layer);
  const blockOutput = containers.map((containerLayer) =>
    generateBlock(containerLayer.id, {
      nodes: containerLayer.nodes,
      edges: containerLayer.edges,
    }),
  );
  const output = `
    ${blockOutput.join(';\n')}
    const ${formatBlockVarName(appContainerId)} = ${formatBlockVarName(
      layer.id,
    )}`;
  return output;
}

export function complie(data: { layer: Layer }) {
  const appContainerId = 'App';
  const appCode = generateContainer(appContainerId, data);

  const output = `
    const {
      start,
      tracker
    } = ${EosCoreSymbol}
    ${appCode}
    function main() {
      window.logs = [];
      tracker.onTrack(record => {
        window.logs.push(record);
      });
      const instance = start(${formatBlockVarName(appContainerId)})
      console.log(\`${formatBlockVarName(appContainerId)}\`, instance)
      return instance
    }

    module.exports = main();
`;

  console.log(output);

  return output;
}
