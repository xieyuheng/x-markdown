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
    const levelRecord: Record<string, number> = {
      h1: 1,
      h2: 2,
      h3: 3,
      h4: 4,
      h5: 5,
      h6: 6,
    }

    const level = levelRecord[token.tag]
    const node = new Nodes.Headline({ level, children })
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "paragraph_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "paragraph_close") {
    const children = collectNodesUntil(stack, "paragraph_open")
    const node = new Nodes.Paragraph({ children })
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "hr") {
    const node = new Nodes.ThematicBreak()
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

  console.error({
    who,
    message: "unhandled token",
    token,
  })

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
