import { nodeChildren, type Node } from "../node/index.js"

export function* traverseNode(node: Node): Generator<Node> {
  yield node

  for (const child of nodeChildren(node)) {
    for (const childNode of traverseNode(child)) {
      yield childNode
    }
  }
}
