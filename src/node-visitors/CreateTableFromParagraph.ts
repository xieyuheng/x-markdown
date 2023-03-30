import { Node } from "../node"
import { NodeVisitor } from "../node-visitor"
import * as Nodes from "../nodes"
import { Parser } from "../parse/Parser"

export class CreateTableFromParagraph extends NodeVisitor<Node> {
  constructor(parser: Parser) {
    super({ parser })
  }

  default(node: Node): Node {
    const newNode = node.shallowCopy()
    newNode.children = newNode.children.map((child) => child.accept(this))
    return newNode
  }

  onParagraph(node: Nodes.Paragraph): Node {
    return node
  }
}
