import frontMatter from "front-matter"
import { Node } from "../node"
import * as Nodes from "../nodes"
import * as Commonmark from "../vendor/commonmark"
import { documentFromCommonmark } from "./documentFromCommonmark"
import { nodeFromCommonmark } from "./nodeFromCommonmark"

export class Parser {
  static create(): Parser {
    return new Parser()
  }

  parseNodes(text: string): Array<Node> {
    const commonmarkParser = new Commonmark.Parser()
    return Commonmark.children(commonmarkParser.parse(text)).map((child) =>
      nodeFromCommonmark(child),
    )
  }

  parseDocument(text: string): Nodes.Document {
    const { attributes, body } = frontMatter(text)
    const commonmarkParser = new Commonmark.Parser()
    return documentFromCommonmark(commonmarkParser.parse(body), {
      attributes,
    })
  }
}
