import frontMatter from "front-matter"
import { Node } from "../node"
import * as NodeVisitors from "../node-visitors"
import * as Nodes from "../nodes"
import * as Commonmark from "../vendor/commonmark"
import { documentFromCommonmark } from "./document-from-commonmark"
import { nodeFromCommonmark } from "./node-from-commonmark"

export interface ParserOptions {
  enableTable?: boolean
}

export class Parser {
  enableTable: boolean

  constructor(opts?: ParserOptions) {
    this.enableTable = opts?.enableTable ?? true
  }

  static create(opts?: ParserOptions): Parser {
    return new Parser(opts)
  }

  postprocess(node: Node): Node {
    if (this.enableTable) {
      node = node.accept(new NodeVisitors.CreateTableFromParagraph(this))
    }

    return node
  }

  parseNodes(text: string): Array<Node> {
    const commonmarkParser = new Commonmark.Parser()
    return Commonmark.children(commonmarkParser.parse(text))
      .map((child) => nodeFromCommonmark(child))
      .map((node) => this.postprocess(node))
  }

  parseDocument(text: string): Nodes.Document {
    const { attributes, body } = frontMatter(text)
    const commonmarkParser = new Commonmark.Parser()
    const node = documentFromCommonmark(commonmarkParser.parse(body), {
      attributes,
    })
    return this.postprocess(node) as any
  }
}
