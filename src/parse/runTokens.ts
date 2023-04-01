import { Node } from "../node"
import { Data } from "./Data"
import { Token } from "./Token"
import { TokenHandler } from "./TokenHandler"
import { collectNodes } from "./collectNodes"

export function runTokens(
  handlers: Record<string, TokenHandler>,
  tokens: Array<Token>,
): Array<Node> {
  const stack: Array<Data> = []

  for (const token of tokens) {
    executeToken(handlers, stack, token)
  }

  return collectNodes(stack)
}

function executeToken(
  handlers: Record<string, TokenHandler>,
  stack: Array<Data>,
  token: Token,
): void {
  const who = "executeToken"

  const handler = handlers[token.type]

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
