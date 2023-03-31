import { Node } from "../node"
import * as Nodes from "../nodes"

export function assertNodeIsItem(node: Node, who: string): Nodes.Item {
  if (node instanceof Nodes.Item) {
    return node
  }

  console.error({
    who,
    message: "expect child node to be Item",
    node,
  })

  throw new Error(`[${who}] expect child node to be Item`)
}
