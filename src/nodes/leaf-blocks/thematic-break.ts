import { Span } from "../../node"
import { NodeVisitor } from "../../node-visitor"
import * as Nodes from "../../nodes"

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
