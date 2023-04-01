import { Node } from "../../node"

export class Paragraph extends Node {
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
