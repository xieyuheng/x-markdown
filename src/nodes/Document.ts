import YAML from "js-yaml"
import { Node, Span } from "../node"
import { NodeVisitor } from "../node-visitor"

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

  shallowCopy(): Document {
    return new Document(this)
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onDocument ? visitor.onDocument(this) : visitor.default(this)
  }

  formatAttributes(): string {
    function replacer(key: string, value: any): any {
      // NOTE
      return value
    }

    return YAML.dump(this.attributes, {
      noArrayIndent: true,
      replacer,
    }).trim()
  }

  formatFrontMatter(): string {
    return ["---", this.formatAttributes(), "---"].join("\n")
  }
}
