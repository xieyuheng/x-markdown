import { type Node } from "../../node/index.js"

export type OrderedItem = {
  kind: "OrderedItem"
  number: number
  delimiter: string
  children: Array<Node>
}
