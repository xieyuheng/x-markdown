import * as Nodes from "../nodes"
import { collectNodesUntil } from "./collectNodesUntil"
import { Data } from "./Data"
import { runInlineTokens } from "./runInlineTokens"
import { Token } from "./Token"

export function executeInlineToken(stack: Array<Data>, token: Token): void {
  const who = "executeInlineToken"

  if (token.type === "text") {
    const node = new Nodes.Text({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "code_inline") {
    const node = new Nodes.Code({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "hardbreak") {
    const node = new Nodes.HardLineBreak()
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "softbreak") {
    const node = new Nodes.SoftLineBreak()
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "em_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "em_close") {
    const [children] = collectNodesUntil(stack, "em_open")
    const node = new Nodes.Emphasis({ children })
    stack.push({ kind: "Node", node })
    return
  }


  if (token.type === "strong_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "strong_close") {
    const [children] = collectNodesUntil(stack, "strong_open")
    const node = new Nodes.Strong({ children })
    stack.push({ kind: "Node", node })
    return
  }
  
  
  if (token.type === "link_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "link_close") {
    const [children, openToken] = collectNodesUntil(stack, "link_open")
    const attrs = Object.fromEntries(openToken.attrs || [])

    const node = new Nodes.Link({
      title: attrs.title || "",
      href: attrs.href,
      children,
    })

    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "image") {
    const children = runInlineTokens(token.children || [])
    const attrs = Object.fromEntries(token.attrs || [])

    const node = new Nodes.Image({
      title: attrs.title,
      href: attrs.src,
      children,
    })

    stack.push({ kind: "Node", node })
    return
  }

  console.error({
    who,
    message: "unhandled token",
    token,
  })

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
