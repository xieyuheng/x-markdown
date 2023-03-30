import { Node } from "../node"
import * as Nodes from "../nodes"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { executeInlineToken } from "./executeInlineToken"

export function runInlineTokens(tokens: Array<Token>): Array<Node> {
  const stack: Array<Data> = []

  for (const token of tokens) {
    executeInlineToken(stack, token)
  }

  return collectNodes(stack)
}

