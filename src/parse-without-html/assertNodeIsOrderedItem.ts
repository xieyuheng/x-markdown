import { Node } from "../node"
import * as Nodes from "../nodes"

export function assertNodeIsOrderedItem(
  node: Node,
  who: string,
): Nodes.OrderedItem {
  if (node instanceof Nodes.OrderedItem) {
    return node
  } else {
    console.error({
      who,
      message: "expect child node to be OrderedItem",
      node,
    })

    throw new Error(`[${who}] expect child node to be OrderedItem`)
  }
}
