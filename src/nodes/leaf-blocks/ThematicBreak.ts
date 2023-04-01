import { Node } from "../../node"

export class ThematicBreak extends Node {
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
