import * as Nodes from "../../nodes"

export class HtmlTag extends Nodes.Inline {
  kind = "HtmlTag"

  text: string

  constructor(options: { text: string }) {
    super()
    this.text = options.text
  }

  json() {
    return {
      kind: this.kind,
      text: this.text,
    }
  }

  format(): string {
    return this.text
  }
}
