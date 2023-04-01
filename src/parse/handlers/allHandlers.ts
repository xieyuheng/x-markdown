import { TokenHandler } from "../TokenHandler"
import { executeTokens } from "../executeTokens"
import { containerBlockHandlers } from "./containerBlockHandlers"
import { footnoteHandlers } from "./footnoteHandlers"
import { inlineHandlers } from "./inlineHandlers"
import { leafBlockHandlers } from "./leafBlockHandlers"

export const allHandlers: Record<string, TokenHandler> = {
  inline(ctx, token) {
    executeTokens(ctx, inlineHandlers, token.children || [])
  },

  ...containerBlockHandlers,
  ...leafBlockHandlers,
  ...footnoteHandlers,
}
