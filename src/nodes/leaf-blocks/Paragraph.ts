import * as Nodes from ".."
import { Node } from "../../node"

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
}
