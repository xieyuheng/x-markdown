import { Node } from "../../node"
import * as Nodes from "../../nodes"

export class Paragraph extends Nodes.LeafBlock {
  kind = "Paragraph"

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
    return this.children.map((child) => child.format()).join("")
  }
}
