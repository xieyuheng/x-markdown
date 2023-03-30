import * as Nodes from ".."
import { Span } from "../../node"
import { NodeVisitor } from "../../node-visitor"

export class List extends Nodes.ContainerBlock {
  kind = "List"

  span: Span
  tight: boolean
  children: Array<Nodes.Item>

  constructor(options: {
    children: Array<Nodes.Item>
    tight: boolean
    span: Span
  }) {
    super()
    this.span = options.span
    this.tight = options.tight
    this.children = options.children
  }

  shallowCopy(): List {
    return new List(this)
  }

  json() {
    return {
      kind: this.kind,
      tight: this.tight,
      children: this.children.map((child) => child.json()),
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onList(this)
  }
}
