import * as Nodes from ".."
import { Node } from "../../node"
import { NodeVisitor } from "../../node-visitor"

export class Emphasis extends Nodes.Inline {
  kind = "Emphasis"

  children: Array<Node>

  constructor(options: { children: Array<Node> }) {
    super()
    this.children = options.children
  }

  shallowCopy(): Emphasis {
    return new Emphasis(this)
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onEmphasis(this)
  }
}
