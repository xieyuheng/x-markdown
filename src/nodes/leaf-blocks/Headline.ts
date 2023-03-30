import * as Nodes from ".."
import { Node, Span } from "../../node"

export class Headline extends Nodes.LeafBlock {
  kind = "Headline"

  span: Span
  level: number
  children: Array<Node>

  constructor(options: { span: Span; level: number; children: Array<Node> }) {
    super()
    this.span = options.span
    this.level = options.level
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      level: this.level,
      children: this.children.map((child) => child.json()),
    }
  }
}
