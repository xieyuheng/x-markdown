import { Node } from "../../node"

export class HtmlBlock extends Node {
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

  format(): string {
    return this.text.trim()
  }
}
