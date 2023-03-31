import frontMatter from "front-matter"
import * as Nodes from "../nodes"
import { Document } from "../nodes"
import { parseNodes } from "./parseNodes"

export function parseDocument(text: string): Nodes.Document {
  const { attributes, body } = frontMatter(text)
  const children = parseNodes(body)

  return new Document({
    attributes: attributes as any,
    children,
  })
}
