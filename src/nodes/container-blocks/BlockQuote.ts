import { Node } from "../../node"

export class BlockQuote extends Node {
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
