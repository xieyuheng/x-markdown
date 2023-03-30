import * as Nodes from ".."
import { NodeVisitor } from "../../node-visitor"

export class HardLineBreak extends Nodes.LineBreak {
  kind = "HardLineBreak"

  constructor() {
    super()
  }

  shallowCopy(): HardLineBreak {
    return new HardLineBreak()
  }

  json() {
    return {
      kind: this.kind,
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onHardLineBreak(this)
  }

  format(): string {
    return "\\\n"
  }
}
