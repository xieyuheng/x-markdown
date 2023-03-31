import * as Nodes from "../nodes"
import { parseDocument as parseDocumentWithoutHTML } from "../parse-without-html"

export function parseDocument(text: string): Nodes.Document {
  return parseDocumentWithoutHTML(text)
}
