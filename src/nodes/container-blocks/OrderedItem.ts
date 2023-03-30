import * as Nodes from ".."
import { Node } from "../../node"

export class OrderedItem extends Nodes.Item {
  kind = "OrderedItem"

  number: number
  delimiter: "." | ")"
  children: Array<Node>

  constructor(options: {
    children: Array<Node>
    number: number
    delimiter: "." | ")"
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
}
