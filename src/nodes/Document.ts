import { Node } from "../node"
import { Footnote } from "../parse/Footnote"

export class Document {
  kind = "Document"

  attributes: Record<string, any>
  children: Array<Node>
  footnotes: Array<Footnote>

  constructor(options: {
    attributes: Record<string, any>
    children: Array<Node>
    footnotes: Array<Footnote>
  }) {
    this.attributes = options.attributes
    this.children = options.children
    this.footnotes = options.footnotes
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }
}
