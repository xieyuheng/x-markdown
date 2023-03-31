import { Node } from "../../node"
import * as Nodes from "../../nodes"

export class OrderedItem extends Nodes.Item {
  kind = "OrderedItem"

  number: number
  delimiter: string
  children: Array<Node>

  constructor(options: {
    children: Array<Node>
    number: number
    delimiter: string
  }) {
    super(options)
    this.number = options.number
    this.delimiter = options.delimiter
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      number: this.number,
      delimiter: this.delimiter,
      children: this.children.map((child) => child.json()),
    }
  }

  format(): string {
    const text = this.children.map((child) => child.format()).join("\n")
    const lines = text.split("\n")

    const prefix = this.number + this.delimiter + " "
    const head = prefix + lines[0]
    const tail = lines.splice(1).map((line) => " ".repeat(prefix.length) + line)

    return [head, ...tail].join("\n")
  }
}
