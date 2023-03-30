import { Node } from "../node"
import frontMatter from "front-matter"

export class Document {
  kind = "Document"

  attributes: Record<string, any>
  children: Array<Node>

  constructor(options: {
    attributes: Record<string, any>
    children: Array<Node>
  }) {
    this.attributes = options.attributes
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      children: this.children.map((child) => child.json()),
    }
  }
}
