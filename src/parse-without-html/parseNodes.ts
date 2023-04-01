import MarkdownIt from "markdown-it"
import FootnotePlugin from "markdown-it-footnote"
import { Node } from "../node"
import { Data } from "./Data"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { executeToken } from "./executeToken"

const parser = new MarkdownIt({ html: false })

parser.use(FootnotePlugin)

export function parseNodes(text: string): Array<Node> {
  const tokens: Array<Token> = parser.parse(text, {})
  const stack: Array<Data> = []
  for (const token of tokens) {
    executeToken(stack, token)
  }

  return collectNodes(stack)
}
