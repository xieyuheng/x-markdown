import * as Nodes from ".."
import { Span } from "../../node"

export class HtmlBlock extends Nodes.LeafBlock {
  kind = "HtmlBlock"

  span: Span
  text: string

  constructor(options: { span: Span; text: string }) {
    super()
    this.span = options.span
    this.text = options.text
  }

  json() {
    return {
      kind: this.kind,
      text: this.text,
    }
  }
}
