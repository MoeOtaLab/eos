import { type Node, type Edge } from 'reactflow';
import { OperatorMap } from '../Operators';
import { type Operator } from '../Operators/Operator';
import { type Subject } from 'rxjs';

export interface GraphNode {
  id: string;
  operator: Operator;
  sourceLink: Record<string, { target: GraphNode; handler: string }>;
}

export type LogicStateStore = Map<string, Subject<any>>;
export const LogicStateStoreSymbol = 'logicStateStore';

export function convertToGraph(nodes: Node[], edges: Edge[]) {
  // convert to graph, only care about their target's source comes from.

  const graphMap = new Map<string, GraphNode>(
    nodes.map((item) => [
      item.id,
      {
        id: item.id,
        operator: item,
        sourceLink: {},
      } as GraphNode,
    ]),
  );

  edges.forEach((edge) => {
    const target = graphMap.get(edge.target);
    const source = graphMap.get(edge.source);

    if (!target || !source || !edge?.targetHandle || !edge?.sourceHandle) {
      console.warn('found useless target/source edge: ', edge);
      return;
    }

    if (target.sourceLink[edge.targetHandle]) {
      console.warn('found duplicate input source: ', edge);
      return;
    }

    target.sourceLink[edge.targetHandle] = {
      target: source,
      handler: edge.sourceHandle,
    };
  });

  return [...graphMap.values()];
}

export function generateLogicState(nodes: Node[], edges: Edge[]) {
  const graph = convertToGraph(nodes, edges);
  const initial = `
    ${graph
      .map(
        (item) => `
      ${LogicStateStoreSymbol}.set('${item.id}', new Rx.Subject());
    `,
      )
      .join('\n')}
  `;

  // link
  const graphCode = graph
    .map((item) => {
      const operation = OperatorMap.get(
        item.operator?.data?.operatorType,
      )?.generateOperation(item);
      const result = `
      (function () {
        let exports;
        ${operation}
        const recordOnlySubject = ${LogicStateStoreSymbol}.get('${item.id}');
        exports?.subscribe(value => recordOnlySubject?.next(value));
      })();
    `;
      return result;
    })
    .join('\n');

  const output = `
    function main() {
      ${initial}
      ${graphCode}
      return ${LogicStateStoreSymbol};
    }

    main();
  `;

  console.log(output);

  return output;
}
