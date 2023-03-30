import { NodeVisitor } from "../../node-visitor"
import * as Nodes from "../../nodes"

export class Code extends Nodes.Inline {
  kind = "Code"

  text: string

  constructor(options: { text: string }) {
    super()
    this.text = options.text
  }

  shallowCopy(): Code {
    return new Code(this)
  }

  json() {
    return {
      kind: this.kind,
      text: this.text,
    }
  }

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.onCode(this)
  }

  format(): string {
    return "`" + this.text + "`"
  }
}
