import * as Nodes from ".."
import { Span } from "../../node"

export class ThematicBreak extends Nodes.LeafBlock {
  kind = "ThematicBreak"

  span: Span

  constructor(options: { span: Span }) {
    super()
    this.span = options.span
  }

  json() {
    return {
      kind: this.kind,
    }
  }
}
