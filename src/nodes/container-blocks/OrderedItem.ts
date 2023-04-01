import { Node } from "../../node"

export type OrderedItem = {
  kind: "OrderedItem"
  number: number
  delimiter: string
  children: Array<Node>
}
