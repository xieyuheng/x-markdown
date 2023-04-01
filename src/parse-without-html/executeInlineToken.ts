import { Data } from "./Data"
import { Token } from "./Token"
import { inlineTokenRoutes } from "./inlineTokenRoutes"

export function executeInlineToken(stack: Array<Data>, token: Token): void {
  const who = "executeInlineToken"

  const handler = inlineTokenRoutes[token.type]

  if (handler) {
    handler(stack, token)
    return
  }

  console.error({
    who,
    message: "unhandled token",
    token,
  })

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
