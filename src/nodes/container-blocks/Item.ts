import * as Nodes from ".."
import { Node } from "../../node"

export class Item extends Nodes.ContainerBlock {
  kind = "Item"

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
