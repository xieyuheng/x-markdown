import { Node, Span } from "../node"

export class Document extends Node {
  kind = "Document"

  attributes: any

  span: Span
  children: Array<Node>

  constructor(options: { attributes: any; span: Span; children: Array<Node> }) {
    super()
    this.attributes = options.attributes
    this.span = options.span
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }
}
