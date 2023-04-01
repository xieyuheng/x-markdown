import { Node } from "../../node"

export class HtmlInline extends Node {
  kind = "HtmlInline"

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
