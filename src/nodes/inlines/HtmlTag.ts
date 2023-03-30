import * as Nodes from ".."
import { NodeVisitor } from "../../node-visitor"

export class HtmlTag extends Nodes.Inline {
  kind = "HtmlTag"

  text: string

  constructor(options: { text: string }) {
    super()
    this.text = options.text
  }

  shallowCopy(): HtmlTag {
    return new HtmlTag(this)
  }

  json() {
    return {
      kind: this.kind,
      text: this.text,
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onHtmlTag(this)
  }

  format(): string {
    return this.text
  }
}
