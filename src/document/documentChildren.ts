import { type Node } from "../node/index.js"
import { type Document } from "./Document.js"

export function documentChildren(document: Document): Array<Node> {
  return [
    ...document.children,
    ...document.footnotes.flatMap((footnote) => footnote.nodes),
  ]
}
