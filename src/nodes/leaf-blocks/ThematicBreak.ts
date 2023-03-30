import * as Nodes from ".."
import { Span } from "../../node"
import { NodeVisitor } from "../../node-visitor"

export class ThematicBreak extends Nodes.LeafBlock {
  kind = "ThematicBreak"

  span: Span

  constructor(options: { span: Span }) {
    super()
    this.span = options.span
  }

  shallowCopy(): ThematicBreak {
    return new ThematicBreak(this)
  }

  json() {
    return {
      kind: this.kind,
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onThematicBreak(this)
  }

  format(): string {
    return "------"
  }
}
