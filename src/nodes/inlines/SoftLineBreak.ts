import * as Nodes from ".."

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

  format(): string {
    return "\n"
  }
}
