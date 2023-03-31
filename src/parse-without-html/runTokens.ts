import { Node } from "../node"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { executeToken } from "./executeToken"

export function runTokens(tokens: Array<Token>): Array<Node> {
  const stack: Array<Data> = []

  for (const token of tokens) {
    executeToken(stack, token)
  }

  return collectNodes(stack)
}
