import { Node } from "../../node"

export class Headline extends Node {
  kind = "Headline"

  level: number
  children: Array<Node>

  constructor(options: { level: number; children: Array<Node> }) {
    super()
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
