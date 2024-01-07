import { type Node } from "../node/index.js"

export function normalizeText(nodes: Array<Node>): Array<Node> {
  // Sometimes, there are extra empty Text.
  nodes = nodes.filter((node) => {
    if (!(node.kind === "Text")) {
      return true
    }

    if (node.text.length === 0) {
      return false
    }

    return true
  })

  return nodes
}
