import frontMatter from "front-matter"
import MarkdownIt from "markdown-it"
import FootnotePlugin from "markdown-it-footnote"
import { type Document } from "../document/index.js"
import { createEmptyContext } from "./Context.js"
import { type Token } from "./Token.js"
import { collectNodes } from "./collectNodes.js"
import { executeTokens } from "./executeTokens.js"
import { allHandlers } from "./handlers/allHandlers.js"

const parser = new MarkdownIt({ html: true })

parser.use(FootnotePlugin)

export function parseDocument(text: string): Document {
  const { attributes, body } = frontMatter(text)
  const tokens: Array<Token> = parser.parse(body, {})
  const ctx = createEmptyContext()
  executeTokens(ctx, allHandlers, tokens)
  const children = collectNodes(ctx.stack)

  return {
    kind: "Document",
    attributes: attributes as any,
    children,
    footnotes: ctx.footnotes,
  }
}
