import { Node } from "../../node"

export type BlockQuote = {
  kind: "BlockQuote"
  children: Array<Node>
}
