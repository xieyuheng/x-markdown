import { TokenHandler } from "../TokenHandler"

export const footnoteHandlers: Record<string, TokenHandler> = {
  footnote_anchor(ctx, token) {
    // Ignored, because this is a view layer thing.
  },
}
