import { documentChildren, type Document } from "../document/index.js"
import { type Node } from "../node/index.js"
import { traverseNode } from "./traverseNode.js"

export function* traverseDocument(document: Document): Generator<Node> {
  for (const child of documentChildren(document)) {
    for (const childNode of traverseNode(child)) {
      yield childNode
    }
  }
}
