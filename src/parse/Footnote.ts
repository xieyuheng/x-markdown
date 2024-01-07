import { type Node } from "../node/index.js"

export type Footnote = {
  id: number
  name?: string
  nodes: Array<Node>
}
