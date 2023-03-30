import * as Nodes from ".."
import { Node, Span } from "../../node"

export class Paragraph extends Nodes.LeafBlock {
  kind = "Paragraph"

  span: Span
  children: Array<Node>

  constructor(options: { children: Array<Node>; span: Span }) {
    super()
    this.span = options.span
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }
}
