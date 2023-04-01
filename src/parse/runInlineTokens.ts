import { Node } from "../node"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { inlineRoutes } from "./inlineRoutes"

export function runInlineTokens(tokens: Array<Token>): Array<Node> {
  const stack: Array<Data> = []

  for (const token of tokens) {
    executeInlineToken(stack, token)
  }

  return collectNodes(stack)
}

function executeInlineToken(stack: Array<Data>, token: Token): void {
  const who = "executeInlineToken"

  const handler = inlineRoutes[token.type]

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
