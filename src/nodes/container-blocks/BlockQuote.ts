import { Node } from "../../node"
import * as Nodes from "../../nodes"

export class BlockQuote extends Nodes.ContainerBlock {
  kind = "BlockQuote"

  children: Array<Node>

  constructor(options: { children: Array<Node> }) {
    super()
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }

  format(): string {
    // NOTE We use "\n\n" instead of "\n" here.
    const text = this.children.map((child) => child.format()).join("\n\n")
    const lines = text.split("\n")

    const prefix = "> "

    return lines.map((line) => prefix + line).join("\n")
  }
}
