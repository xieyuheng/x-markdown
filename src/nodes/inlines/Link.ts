import * as Nodes from ".."
import { Node } from "../../node"

export class Link extends Nodes.Inline {
  kind = "Link"

  title: string
  href: string
  children: Array<Node>

  constructor(options: { title: string; href: string; children: Array<Node> }) {
    super()
    this.title = options.title
    this.href = options.href
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      title: this.title,
      href: this.href,
      children: this.children.map((child) => child.json()),
    }
  }
}
