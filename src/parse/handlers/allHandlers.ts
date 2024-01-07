import { type TokenHandler } from "../TokenHandler.js"
import { executeTokens } from "../executeTokens.js"
import { containerBlockHandlers } from "./containerBlockHandlers.js"
import { footnoteHandlers } from "./footnoteHandlers.js"
import { inlineHandlers } from "./inlineHandlers.js"
import { leafBlockHandlers } from "./leafBlockHandlers.js"

export const allHandlers: Record<string, TokenHandler> = {
  inline(ctx, token) {
    executeTokens(ctx, inlineHandlers, token.children || [])
  },

  ...containerBlockHandlers,
  ...leafBlockHandlers,
  ...footnoteHandlers,
}
