import { LogicStateStoreSymbol } from './flowGraph';

type LogicLine = string | LogicLine[];

export function combineLogic(...lines: LogicLine[]) {
  return lines.flat(Infinity).filter(Boolean).join('\n');
}

export function getState(targetName: string, exportName: string) {
  return `const ${exportName} = ${LogicStateStoreSymbol}.get('${targetName}');`;
}

export function generateArray(arr: any[]) {
  return `[${arr.join(',')}]`;
}

export function generateFunction(
  functionName: string,
  exportName?: string,
  ...args: any[]
) {
  return `${
    exportName ? `const ${exportName} = ` : ''
  }${functionName}(${args.join(', ')});`;
}

export function generateObject(data: Record<string, string>) {
  return `{${Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join(',')}}`;
}

export function exportValue(exportObject: Record<string, string> | string) {
  if (typeof exportObject === 'object') {
    return `exports = ${generateObject(exportObject)}`;
  }
  return `exports = ${exportObject}`;
}
