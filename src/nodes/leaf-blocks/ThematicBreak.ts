import * as Nodes from ".."

export class ThematicBreak extends Nodes.LeafBlock {
  kind = "ThematicBreak"

  constructor() {
    super()
  }

  json() {
    return {
      kind: this.kind,
    }
  }
}
