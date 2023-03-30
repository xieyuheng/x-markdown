import * as Nodes from "../nodes"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodesUntil } from "./collectNodesUntil"
import { inlineNodeFromToken } from "./inlineNodeFromToken"

export function executeToken(stack: Array<Data>, token: Token): void {
  const who = "executeToken"

  if (token.type === "heading_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "heading_close") {
    const children = collectNodesUntil(stack, "heading_open")
    const node = new Nodes.Headline({ level: 1, children })
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "inline") {
    const inlineTokens = token.children || []
    const nodes = inlineTokens.map(inlineNodeFromToken)
    for (const node of nodes) {
      stack.push({ kind: "Node", node })
    }

    return
  }

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
