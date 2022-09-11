import { Elements, isEdge, Edge } from 'react-flow-renderer';
import { OperatorMap } from '../Operators';
import { Operator } from '../Operators/Operator';
import { Subject } from 'rxjs';

export type GraphNode = {
  id: string;
  operator: Operator;
  sourceLink: Record<string, { target: GraphNode; handler: string }>;
};

export type LogicStateStore = Map<string, Subject<any>>;
export const LogicStateStoreSymbol = 'logicStateStore';

export function convertToGraph(elements: Elements) {
  // convert to graph, only care about their target's source comes from.
  const edges = elements.filter((el) => isEdge(el)) as Edge[];

  const graphMap = new Map<string, GraphNode>(
    elements
      .filter((el) => !isEdge(el))
      .map((item) => [
        item.id,
        {
          id: item.id,
          operator: item,
          sourceLink: {},
        } as GraphNode,
      ])
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

export function generateLogicState(elements: Elements) {
  const graph = convertToGraph(elements);
  const initial = `
    ${graph
      .map(
        (item) => `
      ${LogicStateStoreSymbol}.set('${item.id}', new Rx.Subject());
    `
      )
      .join('\n')}
  `;

  // link
  const graphCode = graph
    .map((item) => {
      const operation = OperatorMap.get(
        item.operator?.data?.operatorType
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
