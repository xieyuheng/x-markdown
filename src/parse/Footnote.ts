import { Node } from "../node"

export type Footnote = {
  id: number
  name?: string
  nodes: Array<Node>
}
