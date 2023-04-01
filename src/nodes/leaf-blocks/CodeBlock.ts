import { Node } from "../../node"

export class CodeBlock extends Node {
  kind = "CodeBlock"

  info: string
  text: string

  constructor(options: { info: string; text: string }) {
    super()
    this.info = options.info
    this.text = options.text
  }

  json() {
    return {
      kind: this.kind,
      info: this.info,
      text: this.text,
    }
  }

  format(): string {
    return ["``` " + this.info, this.text.trim(), "```"].join("\n")
  }
}
