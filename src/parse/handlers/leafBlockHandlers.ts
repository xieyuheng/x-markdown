import { TokenHandler } from "../TokenHandler"
import { collectNodesUntil } from "../collectNodesUntil"
import { headlineLevelRecord } from "../headlineLevelRecord"
import { tableHandlers } from "./tableHandlers"

export const leafBlockHandlers: Record<string, TokenHandler> = {
  ...tableHandlers,

  heading_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  heading_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "heading_open")
    const level = headlineLevelRecord[token.tag]
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Headline",
        level,
        children,
      },
    })
  },

  paragraph_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  paragraph_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "paragraph_open")
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Paragraph",
        children,
      },
    })
  },

  hr(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "ThematicBreak",
      },
    })
  },

  fence(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "CodeBlock",
        info: token.info.trim(),
        text: token.content,
      },
    })
  },

  code_block(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "CodeBlock",
        info: "",
        text: token.content,
      },
    })
  },

  html_block(ctx, token) {
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "HtmlBlock",
        text: token.content,
      },
    })
  },
}
