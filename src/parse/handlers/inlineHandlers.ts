import * as Nodes from "../../nodes"
import { createEmptyContext } from "../Context"
import { TokenHandler } from "../TokenHandler"
import { collectNodes } from "../collectNodes"
import { collectNodesUntil } from "../collectNodesUntil"
import { executeTokens } from "../executeTokens"

export const inlineHandlers: Record<string, TokenHandler> = {
  text(ctx, token) {
    const node = new Nodes.Text({
      text: token.content,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  code_inline(ctx, token) {
    const node = new Nodes.Code({
      text: token.content,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  html_inline(ctx, token) {
    const node = new Nodes.HtmlInline({
      text: token.content,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  hardbreak(ctx, token) {
    const node = new Nodes.HardLineBreak()
    ctx.stack.push({ kind: "Node", node })
  },

  softbreak(ctx, token) {
    const node = new Nodes.SoftLineBreak()
    ctx.stack.push({ kind: "Node", node })
  },

  em_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  em_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "em_open")
    const node = new Nodes.Emphasis({ children })
    ctx.stack.push({ kind: "Node", node })
  },

  strong_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  strong_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "strong_open")
    const node = new Nodes.Strong({ children })
    ctx.stack.push({ kind: "Node", node })
  },

  link_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  link_close(ctx, token) {
    const [children, openToken] = collectNodesUntil(ctx.stack, "link_open")
    const attrs = Object.fromEntries(openToken.attrs || [])

    const node = new Nodes.Link({
      title: attrs.title || "",
      href: attrs.href,
      children,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  image(ctx, token) {
    const newCtx = createEmptyContext()
    executeTokens(newCtx, inlineHandlers, token.children || [])
    const children = collectNodes(newCtx.stack)
    const attrs = Object.fromEntries(token.attrs || [])

    const node = new Nodes.Image({
      title: attrs.title,
      href: attrs.src,
      children,
    })

    ctx.stack.push({ kind: "Node", node })
  },

  footnote_ref(ctx, token) {},
}
