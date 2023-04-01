import * as Nodes from "../../nodes"
import { TokenHandler } from "../TokenHandler"
import { collectNodesUntil } from "../collectNodesUntil"
import { runTokens } from "../runTokens"

export const inlineHandlers: Record<string, TokenHandler> = {
  text(stack, token) {
    const node = new Nodes.Text({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
  },

  code_inline(stack, token) {
    const node = new Nodes.Code({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
  },

  html_inline(stack, token) {
    const node = new Nodes.HtmlInline({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
  },

  hardbreak(stack, token) {
    const node = new Nodes.HardLineBreak()
    stack.push({ kind: "Node", node })
  },

  softbreak(stack, token) {
    const node = new Nodes.SoftLineBreak()
    stack.push({ kind: "Node", node })
  },

  em_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  em_close(stack, token) {
    const [children] = collectNodesUntil(stack, "em_open")
    const node = new Nodes.Emphasis({ children })
    stack.push({ kind: "Node", node })
  },

  strong_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  strong_close(stack, token) {
    const [children] = collectNodesUntil(stack, "strong_open")
    const node = new Nodes.Strong({ children })
    stack.push({ kind: "Node", node })
  },

  link_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  link_close(stack, token) {
    const [children, openToken] = collectNodesUntil(stack, "link_open")
    const attrs = Object.fromEntries(openToken.attrs || [])

    const node = new Nodes.Link({
      title: attrs.title || "",
      href: attrs.href,
      children,
    })

    stack.push({ kind: "Node", node })
  },

  image(stack, token) {
    const children = runTokens(inlineHandlers, token.children || [])
    const attrs = Object.fromEntries(token.attrs || [])

    const node = new Nodes.Image({
      title: attrs.title,
      href: attrs.src,
      children,
    })

    stack.push({ kind: "Node", node })
  },
}
