import * as Nodes from "../nodes"
import { Parser } from "../parser"

export function parseDocument(text: string): Nodes.Document {
  return new Parser().parseDocument(text)
}
