import { Node } from "../node"
import { Document } from "./Document"

export function documentChildren(document: Document): Array<Node> {
  return [
    ...document.children,
    ...document.footnotes.flatMap((footnote) => footnote.nodes),
  ]
}
