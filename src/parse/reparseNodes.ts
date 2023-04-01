import { parse } from "@readonlylink/x-node"
import { Node } from "../node"
import * as Nodes from "../nodes"
import { parseNodes as parseNodesWithoutHTML } from "../parse-without-html"
import { groupingXNodes } from "./groupingXNodes"

export function reparseNodes(text: string): Array<Node> {
  const nodes = parse(text)

  const groups = groupingXNodes(nodes)

  return groups.flatMap((group) => {
    if (group.kind === "Text") {
      return parseNodesWithoutHTML(group.text)
    } else {
      return [new Nodes.Element({ element: group.element })]
    }
  })
}
