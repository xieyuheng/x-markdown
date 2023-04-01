import MarkdownIt from "markdown-it"
import FootnotePlugin from "markdown-it-footnote"
import { Node } from "../node"
import { Token } from "./Token"
import { runTokens } from "./runTokens"
import { tokenRoutes } from "./tokenRoutes"

const parser = new MarkdownIt({ html: true })

parser.use(FootnotePlugin)

export function parseNodes(text: string): Array<Node> {
  const tokens: Array<Token> = parser.parse(text, {})
  return runTokens(tokenRoutes, tokens)
}
