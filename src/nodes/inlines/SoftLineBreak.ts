import * as Nodes from "../../nodes"

export class SoftLineBreak extends Nodes.LineBreak {
  kind = "SoftLineBreak"

  constructor() {
    super()
  }

  json() {
    return {
      kind: this.kind,
    }
  }
}
