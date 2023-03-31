import * as Nodes from "../nodes"
import { Data } from "./Data"
import { Token } from "./Token"
import { assertNodeIsItem } from "./assertNodeIsItem"
import { assertNodeIsOrderedItem } from "./assertNodeIsOrderedItem"
import { collectNodesUntil } from "./collectNodesUntil"
import { executeInlineToken } from "./executeInlineToken"
import { executeTableToken } from "./executeTableToken"
import { tokenRoutes } from "./tokenRoutes"

export function executeToken(stack: Array<Data>, token: Token): void {
  const who = "executeToken"

  const handler = tokenRoutes[token.type]

  if (handler) {
    handler(stack, token)
    return
  }

  if (token.type === "paragraph_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "paragraph_close") {
    const [children] = collectNodesUntil(stack, "paragraph_open")
    const node = new Nodes.Paragraph({ children })
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "blockquote_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "blockquote_close") {
    const [children] = collectNodesUntil(stack, "blockquote_open")
    const node = new Nodes.BlockQuote({ children })
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "bullet_list_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "bullet_list_close") {
    const [children] = collectNodesUntil(stack, "bullet_list_open")
    const items = children.map((child) => assertNodeIsItem(child, who))
    const node = new Nodes.List({ children: items })
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "list_item_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "list_item_close") {
    const [children, openToken] = collectNodesUntil(stack, "list_item_open")
    if (openToken.info.length > 0) {
      const node = new Nodes.OrderedItem({
        number: Number(openToken.info),
        delimiter: openToken.markup,
        children,
      })
      stack.push({ kind: "Node", node })
      return
    } else {
      const node = new Nodes.Item({ children })
      stack.push({ kind: "Node", node })
      return
    }
  }

  if (token.type === "ordered_list_open") {
    stack.push({ kind: "Token", token })
    return
  }

  if (token.type === "ordered_list_close") {
    const [children, openToken] = collectNodesUntil(stack, "ordered_list_open")
    const attrs = Object.fromEntries(openToken.attrs || [])
    const orderedItems = children.map((child) =>
      assertNodeIsOrderedItem(child, who),
    )

    const node = new Nodes.OrderedList({
      start: Number(attrs.start),
      delimiter: openToken.markup,
      children: orderedItems,
    })

    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "hr") {
    const node = new Nodes.ThematicBreak()
    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "fence") {
    const node = new Nodes.CodeBlock({
      info: token.info.trim(),
      text: token.content,
    })

    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "inline") {
    if (token.children === null) {
      return
    }

    for (const inlineToken of token.children) {
      executeInlineToken(stack, inlineToken)
    }

    return
  }

  if (executeTableToken(stack, token)) {
    return
  }

  console.error({
    who,
    message: "unhandled token",
    token,
  })

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
