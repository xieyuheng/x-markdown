import { Node } from "../node"
import { Data } from "./Data"

export function collectNodesUntil(
  stack: Array<Data>,
  type: string,
): Array<Node> {
  const who = "collectNodesUntil"

  const nodes: Array<Node> = []

  while (true) {
    const data = stack.pop()
    if (data === undefined) {
      throw new Error(
        `[${who}] expecting token type: ${type}, the stack is empty`,
      )
    }

    if (data.kind === "Node") {
      nodes.unshift(data.node)
      continue
    }

    if (data.token.type === type) {
      break
    }

    throw new Error(
      `[${who}] expecting token type: ${type}, found token type: ${data.token.type}`,
    )
  }

  return nodes
}
