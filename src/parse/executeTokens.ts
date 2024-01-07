import { type Context } from "./Context.js"
import { type Token } from "./Token.js"
import { type TokenHandler } from "./TokenHandler.js"

export function executeTokens(
  ctx: Context,
  handlers: Record<string, TokenHandler>,
  tokens: Array<Token>,
): void {
  for (const token of tokens) {
    executeToken(ctx, handlers, token)
  }
}

function executeToken(
  ctx: Context,
  handlers: Record<string, TokenHandler>,
  token: Token,
): void {
  const who = "executeToken"

  const handler = handlers[token.type]

  if (handler) {
    handler(ctx, token)
    return
  }

  console.error({
    who,
    message: "unhandled token",
    token,
  })

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
