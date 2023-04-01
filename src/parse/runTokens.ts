import { Node } from "../node"
import { Context } from "./Context"
import { Token } from "./Token"
import { TokenHandler } from "./TokenHandler"
import { collectNodes } from "./collectNodes"

export function runTokens(
  handlers: Record<string, TokenHandler>,
  tokens: Array<Token>,
): Array<Node> {
  const ctx = { stack: [], footnotes: [] }

  for (const token of tokens) {
    executeToken(ctx, handlers, token)
  }

  return collectNodes(ctx.stack)
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
