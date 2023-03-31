import { Node } from "../node"
import { Data } from "./Data"

export function collectNodes(stack: Array<Data>): Array<Node> {
  const who = "collectNodes"

  const nodes: Array<Node> = []

  for (const data of stack) {
    if (data.kind === "Node") {
      nodes.push(data.node)
    } else {
      throw new Error(
        `[${who}] remaining token on the stack, token type: ${data.token.type}`,
      )
    }
  }

  return nodes
}
