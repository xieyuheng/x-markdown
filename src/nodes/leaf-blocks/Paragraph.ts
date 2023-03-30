import * as Nodes from ".."
import { Node, Span } from "../../node"
import { NodeVisitor } from "../../node-visitor"

export class Paragraph extends Nodes.LeafBlock {
  kind = "Paragraph"

  span: Span
  children: Array<Node>

  constructor(options: { children: Array<Node>; span: Span }) {
    super()
    this.span = options.span
    this.children = options.children
  }

  shallowCopy(): Paragraph {
    return new Paragraph(this)
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onParagraph(this)
  }

  format(): string {
    return this.children.map((child) => child.format()).join("")
  }
}
