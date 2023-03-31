import * as Nodes from "../../nodes"

export class HardLineBreak extends Nodes.LineBreak {
  kind = "HardLineBreak"

  constructor() {
    super()
  }

  json() {
    return {
      kind: this.kind,
    }
  }

  format(): string {
    return "\\\n"
  }
}
