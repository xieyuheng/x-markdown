import * as Nodes from ".."

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
}
