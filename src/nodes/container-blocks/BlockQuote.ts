import { type Node } from "../../node/index.js"

export type BlockQuote = {
  kind: "BlockQuote"
  children: Array<Node>
}
