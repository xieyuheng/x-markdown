import { collectNodesUntil } from "../collectNodesUntil.js"
import { collectUntil } from "../collectUntil.js"
import { type TokenHandler } from "../TokenHandler.js"

export const footnoteHandlers: Record<string, TokenHandler> = {
  footnote_anchor(ctx, token) {
    // Ignored, because this is a view layer thing.
  },

  footnote_block_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  footnote_block_close(ctx, token) {
    const who = "footnote_block_close"
    collectUntil(ctx.stack, "footnote_block_open")
    // Data are already handled in `footnote_close`.
  },

  footnote_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  footnote_close(ctx, token) {
    const [children, openToken] = collectNodesUntil(ctx.stack, "footnote_open")
    const footnote = {
      id: openToken.meta.id,
      name: openToken.meta.label,
      nodes: children,
    }

    ctx.footnotes.push(footnote)
  },
}
