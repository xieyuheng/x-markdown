import { Node } from "../../node"
import * as Nodes from "../../nodes"

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

  format(): string {
    const text = this.children.map((child) => child.format()).join("\n")
    const lines = text.split("\n")

    const prefix = "- "
    const head = prefix + lines[0]
    const tail = lines.splice(1).map((line) => " ".repeat(prefix.length) + line)

    return [head, ...tail].join("\n")
  }
}
