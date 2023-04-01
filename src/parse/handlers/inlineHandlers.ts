import * as Nodes from "../../nodes"
import { createEmptyContext } from "../Context"
import { TokenHandler } from "../TokenHandler"
import { collectNodes } from "../collectNodes"
import { collectNodesUntil } from "../collectNodesUntil"
import { executeTokens } from "../executeTokens"

export const inlineHandlers: Record<string, TokenHandler> = {
  text(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: new Nodes.Text({
        text: token.content,
      }),
    })
  },

  code_inline(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: new Nodes.Code({
        text: token.content,
      }),
    })
  },

  html_inline(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: new Nodes.HtmlInline({
        text: token.content,
      }),
    })
  },

  hardbreak(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: new Nodes.HardLineBreak(),
    })
  },

  softbreak(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: new Nodes.SoftLineBreak(),
    })
  },

  em_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  em_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "em_open")

    ctx.stack.push({ kind: "Node", node: new Nodes.Emphasis({ children }) })
  },

  strong_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  strong_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "strong_open")

    ctx.stack.push({
      kind: "Node",
      node: new Nodes.Strong({ children }),
    })
  },

  link_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  link_close(ctx, token) {
    const [children, openToken] = collectNodesUntil(ctx.stack, "link_open")
    const attrs = Object.fromEntries(openToken.attrs || [])

    ctx.stack.push({
      kind: "Node",
      node: new Nodes.Link({
        title: attrs.title || "",
        href: attrs.href,
        children,
      }),
    })
  },

  image(ctx, token) {
    const newCtx = createEmptyContext()
    executeTokens(newCtx, inlineHandlers, token.children || [])
    const children = collectNodes(newCtx.stack)
    const attrs = Object.fromEntries(token.attrs || [])

    ctx.stack.push({
      kind: "Node",
      node: new Nodes.Image({
        title: attrs.title,
        href: attrs.src,
        children,
      }),
    })
  },

  footnote_ref(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: new Nodes.FootnoteRef({
        id: token.meta.id,
        name: token.meta.label,
      }),
    })
  },
}
