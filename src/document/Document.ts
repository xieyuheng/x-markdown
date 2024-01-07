import { type Node } from "../node/index.js"
import { type Footnote } from "../parse/Footnote.js"

export type Document = {
  kind: "Document"
  attributes: Record<string, any>
  children: Array<Node>
  footnotes: Array<Footnote>
}
