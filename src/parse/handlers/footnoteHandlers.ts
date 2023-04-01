import { collectUntil } from "../collectUntil"
import { TokenHandler } from "../TokenHandler"

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
}
