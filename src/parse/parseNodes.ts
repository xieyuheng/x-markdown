import MarkdownIt from "markdown-it"
import { Node } from "../node"
import * as Nodes from "../nodes"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodesUntil } from "./collectNodesUntil"
import { collectNodes } from "./collectNodes"
import { inlineNodeFromToken } from "./inlineNodeFromToken"

const parser = new MarkdownIt({ html: false })

export function parseNodes(text: string): Array<Node> {
  const stack: Array<Data> = []

  const tokens: Array<Token> = parser.parse(text, {})
  for (const token of tokens) {
    executeToken(stack, token)
  }

  return collectNodes(stack)
}

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
