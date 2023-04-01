import { Node } from "../node"
import * as Nodes from "../nodes"

export function assertNodeIsOrderedItem(
  node: Node,
  who: string,
): Nodes.OrderedItem {
  if (node instanceof Nodes.OrderedItem) {
    return node
  }

  const message = "expect child node to be OrderedItem"
  console.error({ who, message, node })
  throw new Error(`[${who}] ${message}`)
}
