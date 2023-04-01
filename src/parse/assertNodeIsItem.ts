import { Node } from "../node"
import * as Nodes from "../nodes"

export function assertNodeIsItem(node: Node, who: string): Nodes.Item {
  if (node.kind === "Item") {
    return node
  }

  const message = "expect child node to be Item"
  console.error({ who, message, node })
  throw new Error(`[${who}] ${message}`)
}
