import MarkdownIt from "markdown-it"
import { Node } from "../node"
import { Token } from "./Token"
import { runTokens } from "./runTokens"

const parser = new MarkdownIt({ html: false })

export function parseNodes(text: string): Array<Node> {
  const tokens: Array<Token> = parser.parse(text, {})
  return runTokens(tokens)
}
