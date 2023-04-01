import { Node } from "../node"
import { Footnote } from "../parse/Footnote"

export type Document = {
  kind: "Document"
  attributes: Record<string, any>
  children: Array<Node>
  footnotes: Array<Footnote>
}
