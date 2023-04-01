import * as Nodes from "../../nodes"
import { TokenHandler } from "../TokenHandler"
import { assertNodeIsItem } from "../assertNodeIsItem"
import { assertNodeIsOrderedItem } from "../assertNodeIsOrderedItem"
import { collectNodesUntil } from "../collectNodesUntil"
import { executeTokens } from "../executeTokens"
import { headlineLevelRecord } from "../headlineLevelRecord"
import { footnoteHandlers } from "./footnoteHandlers"
import { inlineHandlers } from "./inlineHandlers"
import { tableHandlers } from "./tableHandlers"

export const allHandlers: Record<string, TokenHandler> = {
  inline(ctx, token) {
    executeTokens(ctx, inlineHandlers, token.children || [])
  },

  ...tableHandlers,
  ...footnoteHandlers,

  heading_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  heading_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "heading_open")
    const level = headlineLevelRecord[token.tag]
    const node = new Nodes.Headline({ level, children })
    ctx.stack.push({ kind: "Node", node })
  },

  paragraph_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  paragraph_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "paragraph_open")
    const node = new Nodes.Paragraph({ children })
    ctx.stack.push({ kind: "Node", node })
  },

  blockquote_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  blockquote_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "blockquote_open")
    const node = new Nodes.BlockQuote({ children })
    ctx.stack.push({ kind: "Node", node })
  },

  bullet_list_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  bullet_list_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "bullet_list_open")
    const items = children.map((child) =>
      assertNodeIsItem(child, "bullet_list_close"),
    )
    const node = new Nodes.List({ children: items })
    ctx.stack.push({ kind: "Node", node })
  },

  list_item_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  list_item_close(ctx, token) {
    const [children, openToken] = collectNodesUntil(ctx.stack, "list_item_open")
    if (openToken.info.length > 0) {
      const node = new Nodes.OrderedItem({
        number: Number(openToken.info),
        delimiter: openToken.markup,
        children,
      })
      ctx.stack.push({ kind: "Node", node })
    } else {
      const node = new Nodes.Item({ children })
      ctx.stack.push({ kind: "Node", node })
    }
  },

  ordered_list_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  ordered_list_close(ctx, token) {
    const [children, openToken] = collectNodesUntil(
      ctx.stack,
      "ordered_list_open",
    )
    const attrs = Object.fromEntries(openToken.attrs || [])
    const orderedItems = children.map((child) =>
      assertNodeIsOrderedItem(child, "ordered_list_close"),
    )

    const node = new Nodes.OrderedList({
      start: Number(attrs.start),
      delimiter: openToken.markup,
      children: orderedItems,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  hr(ctx, token) {
    const node = new Nodes.ThematicBreak()
    ctx.stack.push({ kind: "Node", node })
  },

  fence(ctx, token) {
    const node = new Nodes.CodeBlock({
      info: token.info.trim(),
      text: token.content,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  code_block(ctx, token) {
    const node = new Nodes.CodeBlock({
      info: "",
      text: token.content,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  html_block(ctx, token) {
    const node = new Nodes.HtmlBlock({
      text: token.content,
    })

    ctx.stack.push({ kind: "Node", node })
  },
}
