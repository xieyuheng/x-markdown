import { Node } from "../node"
import { Data } from "./Data"
import { Token } from "./Token"
import { TokenHandler } from "./TokenHandler"
import { collectNodes } from "./collectNodes"

export function runTokens(
  routes: Record<string, TokenHandler>,
  tokens: Array<Token>,
): Array<Node> {
  const stack: Array<Data> = []

  for (const token of tokens) {
    executeToken(routes, stack, token)
  }

  return collectNodes(stack)
}

function executeToken(
  routes: Record<string, TokenHandler>,
  stack: Array<Data>,
  token: Token,
): void {
  const who = "executeToken"

  const handler = routes[token.type]

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
