import * as Nodes from ".."
import { Node } from "../../node"
import { NodeVisitor } from "../../node-visitor"

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

  shallowCopy(): Link {
    return new Link(this)
  }

  json() {
    return {
      kind: this.kind,
      title: this.title,
      href: this.href,
      children: this.children.map((child) => child.json()),
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onLink(this)
  }
}
