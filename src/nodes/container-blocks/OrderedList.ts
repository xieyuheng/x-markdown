import * as Nodes from "../../nodes"

export class OrderedList extends Nodes.List {
  kind = "OrderedList"

  start: number
  delimiter: string
  children: Array<Nodes.OrderedItem>

  constructor(options: {
    children: Array<Nodes.OrderedItem>
    start: number
    delimiter: string
  }) {
    super(options)
    this.start = options.start
    this.delimiter = options.delimiter
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      start: this.start,
      delimiter: this.delimiter,
      children: this.children.map((child) => child.json()),
    }
  }
}
