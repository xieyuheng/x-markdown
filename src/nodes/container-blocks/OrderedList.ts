import * as Nodes from "../../nodes/index.js"

export type OrderedList = {
  kind: "OrderedList"
  start: number
  delimiter: string
  children: Array<Nodes.OrderedItem>
}
