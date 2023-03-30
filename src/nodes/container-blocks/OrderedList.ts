import * as Nodes from ".."
import { Span } from "../../node"
import { NodeVisitor } from "../../node-visitor"

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

  shallowCopy(): OrderedList {
    return new OrderedList(this)
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

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onOrderedList(this)
  }

  format(): string {
    if (this.tight) {
      return this.children.map((child) => child.format()).join("\n")
    } else {
      return this.children.map((child) => child.format()).join("\n\n")
    }
  }
}
