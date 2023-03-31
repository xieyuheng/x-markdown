import { Data } from "./Data"
import { Token } from "./Token"
import { executeTableToken } from "./executeTableToken"
import { tokenRoutes } from "./tokenRoutes"

export function executeToken(stack: Array<Data>, token: Token): void {
  const who = "executeToken"

  const handler = tokenRoutes[token.type]

  if (handler) {
    handler(stack, token)
    return
  }

  if (executeTableToken(stack, token)) {
    return
  }

  console.error({
    who,
    message: "unhandled token",
    token,
  })

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
