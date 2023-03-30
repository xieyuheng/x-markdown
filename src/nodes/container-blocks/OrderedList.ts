import * as Nodes from ".."
import { Span } from "../../node"

export class OrderedList extends Nodes.List {
  kind = "OrderedList"

  span: Span
  tight: boolean
  start: number
  delimiter: "." | ")"
  children: Array<Nodes.OrderedItem>

  constructor(options: {
    children: Array<Nodes.OrderedItem>
    tight: boolean
    start: number
    delimiter: "." | ")"
    span: Span
  }) {
    super(options)
    this.span = options.span
    this.tight = options.tight
    this.start = options.start
    this.delimiter = options.delimiter
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      tight: this.tight,
      start: this.start,
      delimiter: this.delimiter,
      children: this.children.map((child) => child.json()),
    }
  }
}
