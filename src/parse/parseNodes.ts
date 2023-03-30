import MarkdownIt from "markdown-it"
import { Node } from "../node"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { executeToken } from "./executeToken"

const parser = new MarkdownIt({ html: false })

export function parseNodes(text: string): Array<Node> {
  const stack: Array<Data> = []

  const tokens: Array<Token> = parser.parse(text, {})
  for (const token of tokens) {
    executeToken(stack, token)
  }

  return collectNodes(stack)
}
