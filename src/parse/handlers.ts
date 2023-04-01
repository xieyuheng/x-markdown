import * as Nodes from "../nodes"
import { assertNodeIsItem } from "./assertNodeIsItem"
import { assertNodeIsOrderedItem } from "./assertNodeIsOrderedItem"
import { collectNodesUntil } from "./collectNodesUntil"
import { headlineLevelRecord } from "./headlineLevelRecord"
import { inlineHandlers } from "./inlineHandlers"
import { runTokens } from "./runTokens"
import { tableHandlers } from "./tableHandlers"
import { TokenHandler } from "./TokenHandler"

export const handlers: Record<string, TokenHandler> = {
  inline(stack, token) {
    for (const node of runTokens(inlineHandlers, token.children || [])) {
      stack.push({ kind: "Node", node })
    }
  },

  ...tableHandlers,

  heading_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  heading_close(stack, token) {
    const [children] = collectNodesUntil(stack, "heading_open")
    const level = headlineLevelRecord[token.tag]
    const node = new Nodes.Headline({ level, children })
    stack.push({ kind: "Node", node })
  },

  paragraph_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  paragraph_close(stack, token) {
    const [children] = collectNodesUntil(stack, "paragraph_open")
    const node = new Nodes.Paragraph({ children })
    stack.push({ kind: "Node", node })
  },

  blockquote_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  blockquote_close(stack, token) {
    const [children] = collectNodesUntil(stack, "blockquote_open")
    const node = new Nodes.BlockQuote({ children })
    stack.push({ kind: "Node", node })
  },

  bullet_list_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  bullet_list_close(stack, token) {
    const [children] = collectNodesUntil(stack, "bullet_list_open")
    const items = children.map((child) =>
      assertNodeIsItem(child, "bullet_list_close"),
    )
    const node = new Nodes.List({ children: items })
    stack.push({ kind: "Node", node })
  },

  list_item_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  list_item_close(stack, token) {
    const [children, openToken] = collectNodesUntil(stack, "list_item_open")
    if (openToken.info.length > 0) {
      const node = new Nodes.OrderedItem({
        number: Number(openToken.info),
        delimiter: openToken.markup,
        children,
      })
      stack.push({ kind: "Node", node })
    } else {
      const node = new Nodes.Item({ children })
      stack.push({ kind: "Node", node })
    }
  },

  ordered_list_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  ordered_list_close(stack, token) {
    const [children, openToken] = collectNodesUntil(stack, "ordered_list_open")
    const attrs = Object.fromEntries(openToken.attrs || [])
    const orderedItems = children.map((child) =>
      assertNodeIsOrderedItem(child, "ordered_list_close"),
    )

    const node = new Nodes.OrderedList({
      start: Number(attrs.start),
      delimiter: openToken.markup,
      children: orderedItems,
    })

    stack.push({ kind: "Node", node })
  },

  hr(stack, token) {
    const node = new Nodes.ThematicBreak()
    stack.push({ kind: "Node", node })
  },

  fence(stack, token) {
    const node = new Nodes.CodeBlock({
      info: token.info.trim(),
      text: token.content,
    })

    stack.push({ kind: "Node", node })
  },

  code_block(stack, token) {
    const node = new Nodes.CodeBlock({
      info: "",
      text: token.content,
    })

    stack.push({ kind: "Node", node })
  },

  html_block(stack, token) {
    const node = new Nodes.HtmlBlock({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
  },
}
