import { Node } from "../node"
import { parseNodes } from "../parse-without-html"

export function reparseNodes(text: string): Array<Node> {
  return parseNodes(text)
}
