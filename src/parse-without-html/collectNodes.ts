import { Node } from "../node"
import { Data } from "./Data"

export function collectNodes(stack: Array<Data>): Array<Node> {
  const who = "collectNodes"

  const nodes: Array<Node> = []

  for (const data of stack) {
    if (data.kind === "Node") {
      nodes.push(data.node)
    } else {
      console.error({
        who,
        message: `expect data to be Node instead of: ${data.kind}`,
        data,
      })

      throw new Error(
        `[${who}] expect data to be Node instead of: ${data.kind}`,
      )
    }
  }

  return nodes
}
