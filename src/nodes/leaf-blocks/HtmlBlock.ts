import * as Nodes from ".."

export class HtmlBlock extends Nodes.LeafBlock {
  kind = "HtmlBlock"

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
