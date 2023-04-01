import * as Nodes from "../../nodes"

export class FootnoteRef extends Nodes.Inline {
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
      id: this.id,
      name: this.name,
    }
  }

  format(): string {
    return `[^${this.name || "#" + this.id}]`
  }
}
