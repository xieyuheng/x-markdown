import { type Node } from "../../node/index.js"

export type Item = {
  kind: "Item"
  children: Array<Node>
}
