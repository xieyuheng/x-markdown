import * as Nodes from ".."
import { Node, Span } from "../../node"
import { NodeVisitor } from "../../node-visitor"

export class BlockQuote extends Nodes.ContainerBlock {
  kind = "BlockQuote"

  span: Span
  children: Array<Node>

  constructor(options: { children: Array<Node>; span: Span }) {
    super()
    this.span = options.span
    this.children = options.children
  }

  shallowCopy(): BlockQuote {
    return new BlockQuote(this)
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onBlockQuote(this)
  }

  format(): string {
    // NOTE We use "\n\n" instead of "\n" here.
    const text = this.children.map((child) => child.format()).join("\n\n")
    const lines = text.split("\n")

    const prefix = "> "

    return lines.map((line) => prefix + line).join("\n")
  }
}