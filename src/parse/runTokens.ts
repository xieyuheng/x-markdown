import { Node } from "../node"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { tokenRoutes } from "./tokenRoutes"

export function runTokens(tokens: Array<Token>): Array<Node> {
  const stack: Array<Data> = []

  for (const token of tokens) {
    executeToken(stack, token)
  }

  return collectNodes(stack)
}

function executeToken(stack: Array<Data>, token: Token): void {
  const who = "executeToken"

  const handler = tokenRoutes[token.type]

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
