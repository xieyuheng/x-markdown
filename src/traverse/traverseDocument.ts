import { Document, documentChildren } from "../document"
import { Node } from "../node"
import { traverseNode } from "./traverseNode"

export function* traverseDocument(document: Document): Generator<Node> {
  for (const child of documentChildren(document)) {
    for (const childNode of traverseNode(child)) {
      yield childNode
    }
  }
}
