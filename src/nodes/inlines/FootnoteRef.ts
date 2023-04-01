import { Node } from "../../node"

export class FootnoteRef extends Node {
  kind = "FootnoteRef"

  id: number
  name?: string

  constructor(options: { id: number; name?: string }) {
    super()
    this.id = options.id
    this.name = options.name
  }

  json() {
    return {
      kind: this.kind,
      id: this.id,
      name: this.name,
    }
  }
}
