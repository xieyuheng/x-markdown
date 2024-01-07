import { type Node } from "../node/index.js"
import * as Nodes from "../nodes/index.js"

export function assertNodeIsOrderedItem(
  node: Node,
  who: string,
): Nodes.OrderedItem {
  if (node.kind === "OrderedItem") {
    return node
  }

  const message = "expect child node to be OrderedItem"
  console.error({ who, message, node })
  throw new Error(`[${who}] ${message}`)
}
