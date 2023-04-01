import { assertDataIsFootnoteData } from "../assertDataIsFootnoteData"
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
    const [collected] = collectUntil(ctx.stack, "footnote_block_open")
    const footnotes = collected.map((data) =>
      assertDataIsFootnoteData(data, who),
    )

    ctx.footnotes.push(...footnotes)
  },
}
