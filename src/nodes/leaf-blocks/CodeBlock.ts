import * as Nodes from ".."

export class CodeBlock extends Nodes.LeafBlock {
  kind = "CodeBlock"

  info: string
  text: string
  isIndentedCodeBlock: boolean

  constructor(options: {
    info: string
    text: string
    isIndentedCodeBlock: boolean
  }) {
    super()
    this.info = options.info
    this.text = options.text
    this.isIndentedCodeBlock = options.isIndentedCodeBlock
  }

  get name(): string {
    const [name] = this.info.split(" ")
    return name
  }

  get extraInfo(): string {
    const [_name, ...extra] = this.info.split(" ")
    return extra.join(" ")
  }

  json() {
    return {
      kind: this.kind,
      info: this.info,
      text: this.text,
    }
  }
}
