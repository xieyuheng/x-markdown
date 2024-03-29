import { type Node } from "../../node/index.js"

export type Alignment = null | "left" | "right" | "center"

export type Table = {
  kind: "Table"
  alignments: Array<Alignment>
  head: Array<Array<Node>>
  body: Array<Array<Array<Node>>>
}
