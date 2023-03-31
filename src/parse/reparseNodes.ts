import { parseNodes } from "@readonlylink/x-node"
import { Node } from "../node"
import { parseNodes as parseNodesWithoutHTML } from "../parse-without-html"

export function reparseNodes(text: string): Array<Node> {
  const nodes = parseNodes(text)

  return parseNodesWithoutHTML(text)
}
