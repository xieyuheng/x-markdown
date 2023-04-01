import { Node } from "../../node"
import * as Nodes from "../../nodes"

export class List extends Node {
  kind = "List"

  children: Array<Nodes.Item>

  constructor(options: { children: Array<Nodes.Item> }) {
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
