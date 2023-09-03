import type { ModelBlock } from '../ModelBlock';

export class RelationHelper {
  node: ModelBlock;

  constructor(node: ModelBlock) {
    this.node = node;
  }

  getLastChild() {
    let lastNode = this.node.next;
    while (lastNode?.nextSibling) {
      lastNode = lastNode.nextSibling;
    }

    return lastNode;
  }

  addNextChildren(...children: ModelBlock[]) {
    const [child] = children;
    let next = child;
    child.return = this.node;

    for (let i = 1; i < children?.length; i++) {
      const child = children[i];
      next.nextSibling = child;
      next = child;
      child.return = this.node;
    }

    const lastChild = this.getLastChild();
    if (lastChild) {
      lastChild.nextSibling = child;
    } else {
      this.node.next = child;
    }
  }

  removeChild(child: ModelBlock) {
    const next = this.node.next;

    if (next === child) {
      this.node.next = next.nextSibling;
      return true;
    }

    while (next?.nextSibling) {
      if (next.nextSibling === child) {
        next.nextSibling = next.nextSibling.nextSibling;
        return true;
      }
    }

    return false;
  }

  *children() {
    let next = this.node.next;
    while (next) {
      yield next;
      next = next.nextSibling;
    }
  }

  preAction(currentNode: ModelBlock, action: (modelBlock: ModelBlock) => void) {
    let next: ModelBlock | null | undefined = currentNode;
    // eslint-disable-next-line no-labels
    outer: while (next && next !== currentNode.return) {
      action(next);
      if (next.next) {
        next = next.next;
      } else if (next.nextSibling) {
        next = next.nextSibling;
        // next = next.return;
      } else {
        // up
        next = next.return;

        while (next && next !== currentNode) {
          if (next.nextSibling) {
            next = next.nextSibling;
            // eslint-disable-next-line no-labels
            continue outer;
          }
          next = next?.return;
        }

        break;
      }
    }
  }

  postAction(
    currentNode: ModelBlock,
    action: (modelBlock: ModelBlock) => void
  ) {
    let next: ModelBlock | null | undefined = currentNode;

    // get down.
    while (next.next) {
      next = next?.next;
    }

    while (next && next !== currentNode.return) {
      action(next);

      if (next.nextSibling) {
        next = next.nextSibling;
        // get down.
        while (next.next) {
          next = next?.next;
        }

        continue;
      }

      next = next.return;
    }
  }

  action(
    type: 'pre' | 'post',
    currentNode: ModelBlock,
    action: (modelBlock: ModelBlock) => void
  ) {
    if (type === 'pre') {
      return this.preAction(currentNode, action);
    } else if (type === 'post') {
      return this.postAction(currentNode, action);
    } else {
      console.log('unknow type', type);
    }
  }
}
