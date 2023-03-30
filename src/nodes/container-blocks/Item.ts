import * as Nodes from ".."
import { Node, Span } from "../../node"
import { NodeVisitor } from "../../node-visitor"

export class Item extends Nodes.ContainerBlock {
  kind = "Item"

  span: Span
  children: Array<Node>

  constructor(options: { children: Array<Node>; span: Span }) {
    super()
    this.span = options.span
    this.children = options.children
  }

  shallowCopy(): Item {
    return new Item(this)
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onItem(this)
  }
}
