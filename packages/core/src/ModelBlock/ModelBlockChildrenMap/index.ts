import type { ModelBlock } from '../ModelBlock';

export class ModelBlockChildrenMap {
  children: ModelBlock[];

  protected childrenMap: Map<string, ModelBlock> = new Map();

  constructor(children: ModelBlock[]) {
    this.children = children || [];
    this.updateChildrenMap();
  }

  protected updateChildrenMap() {
    this.childrenMap = new Map(this.children.map((item) => [item.name, item]));
  }

  get<T extends ModelBlock>(name: string) {
    return this.childrenMap.get(name) as T | undefined;
  }

  protected removeByInstance(...block: ModelBlock[]) {
    this.children = this.children.filter((item) => !block.includes(item));
    this.updateChildrenMap();
  }

  async remove(...block: ModelBlock[]) {
    // first delete
    this.remove(...block);
  }

  async add(...block: ModelBlock[]) {
    this.children.push(...block);
    this.updateChildrenMap();
  }
}
