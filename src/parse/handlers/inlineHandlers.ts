import { createEmptyContext } from "../Context.js"
import { type TokenHandler } from "../TokenHandler.js"
import { collectNodes } from "../collectNodes.js"
import { collectNodesUntil } from "../collectNodesUntil.js"
import { executeTokens } from "../executeTokens.js"

export const inlineHandlers: Record<string, TokenHandler> = {
  text(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Text",
        text: token.content,
      },
    })
  },

  code_inline(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Code",
        text: token.content,
      },
    })
  },

  html_inline(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "HtmlInline",
        text: token.content,
      },
    })
  },

  hardbreak(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "HardLineBreak",
      },
    })
  },

  softbreak(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "SoftLineBreak",
      },
    })
  },

  em_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  em_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "em_open")

    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Emphasis",
        children,
      },
    })
  },

  strong_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  strong_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "strong_open")

    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Strong",
        children,
      },
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
      node: {
        kind: "Link",
        title: attrs.title || "",
        href: attrs.href,
        children,
      },
    })
  },

  image(ctx, token) {
    const newCtx = createEmptyContext()
    executeTokens(newCtx, inlineHandlers, token.children || [])
    const children = collectNodes(newCtx.stack)
    const attrs = Object.fromEntries(token.attrs || [])

    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Image",
        alt: attrs.title,
        src: attrs.src,
        children,
      },
    })
  },

  footnote_ref(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "FootnoteRef",
        id: token.meta.id,
        name: token.meta.label,
      },
    })
  },
}
