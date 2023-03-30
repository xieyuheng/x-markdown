import { Node } from "../node"
import * as Nodes from "../nodes"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { executeInlineToken } from "./executeInlineToken"

export function normalizeText(nodes: Array<Node>): Array<Node> {
  nodes = nodes.filter((node) => {
    if (!(node instanceof Nodes.Text)) {
      return true
    }

    if (node.text.length === 0) {
      return false
    }

    return true
  })

  return nodes
}
