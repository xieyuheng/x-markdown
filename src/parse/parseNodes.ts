import MarkdownIt from "markdown-it"
import { Node } from "../node"
import * as Nodes from "../nodes"
import { Token } from "./Token"

const parser = new MarkdownIt({ html: false })

type Data = { kind: "Node"; node: Node } | { kind: "Token"; token: Token }

export function parseNodes(text: string): Array<Node> {
  const stack: Array<Data> = []

  const tokens: Array<Token> = parser.parse(text, {})
  for (const token of tokens) {
    executeToken(stack, token)
  }

  return collectNodes(stack)
}

function executeToken(stack: Array<Data>, token: Token): void {
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

  console.error({
    who,
    message: "unhandled token",
    token,
  })
}

function collectNodes(stack: Array<Data>): Array<Node> {
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

function collectNodesUntil(stack: Array<Data>, type: string): Array<Node> {
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
    } else if (data.token.type === type) {
      break
    } else {
      throw new Error(
        `[${who}] expecting token type: ${type}, found token type: ${data.token.type}`,
      )
    }
  }

  return nodes
}

function inlineNodeFromToken(token: Token): Nodes.Inline {
  const who = "inlineNodesFromToken"

  if (token.type === "text") {
    return new Nodes.Text({
      text: token.content,
    })
  }

  throw new Error(`[${who}] unhandled inline token type: ${token.type}`)
}
