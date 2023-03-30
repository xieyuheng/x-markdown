import * as Nodes from ".."

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
}
