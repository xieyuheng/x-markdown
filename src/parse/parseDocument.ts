import * as Nodes from "../nodes"
import { parseDocument as parseDocumentWithoutHTML } from "../parse-without-html"
import { reparseNodes } from "./reparseNodes"

export function parseDocument(text: string): Nodes.Document {
  const document = parseDocumentWithoutHTML(text)
  document.children = reparseNodes(document.children)
  return document
}
