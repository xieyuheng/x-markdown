import frontMatter from "front-matter"
import MarkdownIt from "markdown-it"
import FootnotePlugin from "markdown-it-footnote"
import * as Nodes from "../nodes"
import { Document } from "../nodes"
import { createEmptyContext } from "./Context"
import { Token } from "./Token"
import { collectNodes } from "./collectNodes"
import { executeTokens } from "./executeTokens"
import { allHandlers } from "./handlers/allHandlers"

const parser = new MarkdownIt({ html: true })

parser.use(FootnotePlugin)

export function parseDocument(text: string): Nodes.Document {
  const { attributes, body } = frontMatter(text)
  const tokens: Array<Token> = parser.parse(body, {})
  const ctx = createEmptyContext()
  executeTokens(ctx, allHandlers, tokens)
  const children = collectNodes(ctx.stack)

  return new Document({
    attributes: attributes as any,
    children,
    footnotes: ctx.footnotes,
  })
}
