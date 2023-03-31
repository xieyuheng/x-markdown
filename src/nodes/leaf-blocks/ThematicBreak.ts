import * as Nodes from "../../nodes"

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

  format(): string {
    return "------"
  }
}
