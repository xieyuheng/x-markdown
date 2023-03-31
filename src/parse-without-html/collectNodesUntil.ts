import { Node } from "../node"
import { Data } from "./Data"
import { normalizeText } from "./normalizeText"
import { Token } from "./Token"

export function collectNodesUntil(
  stack: Array<Data>,
  type: string,
): [Array<Node>, Token] {
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

    if (data.kind === "Token" && data.token.type === type) {
      return [normalizeText(nodes), data.token]
    }

    console.error({
      who,
      message: `expect data to be Node or Token instead of: ${data.kind}`,
      data,
    })

    throw new Error(
      `[${who}] expect data to be Node or Token instead of: ${data.kind}`,
    )
  }
}
