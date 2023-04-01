import { Node } from "../node"

export type FootnoteData = {
  kind: "FootnoteData"
  id: number
  name?: string
  nodes: Array<Node>
}
