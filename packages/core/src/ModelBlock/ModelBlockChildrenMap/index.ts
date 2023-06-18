import type { ModelBlock } from '../ModelBlock';

type ModelBlockChildrenMapHandler = {
  onChildrenRemove: (children: ModelBlock[]) => Promise<void> | void;
  onChildrenCreate: (children: ModelBlock[]) => Promise<void> | void;
};

export class ModelBlockChildrenMap {
  children: ModelBlock[];

  protected childrenMap: Map<string, ModelBlock> = new Map();

  protected handler: ModelBlockChildrenMapHandler;

  constructor(children: ModelBlock[], options: ModelBlockChildrenMapHandler) {
    this.children = children || [];
    this.updateChildrenMap();
    this.handler = options;
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
    this.removeByInstance(...block);
    await this.handler.onChildrenRemove(block);
  }

  async add(...block: ModelBlock[]) {
    // first add
    await this.handler.onChildrenCreate(block);
    this.children.push(...block);
    this.updateChildrenMap();
  }
}
