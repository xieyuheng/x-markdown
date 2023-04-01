import { parse } from "@readonlylink/x-node"
import { Node } from "../node"
import * as Nodes from "../nodes"
import { parseNodes as parseNodesWithoutHTML } from "../parse-without-html"
import { groupingNodesForReparse } from "./groupingNodesForReparse"
import { groupingXNodes } from "./groupingXNodes"

export function reparseNodes(nodes: Array<Node>): Array<Node> {
  const groups = groupingNodesForReparse(nodes).map((group) => {
    if (group.kind === "Reparse") {
      const text = group.nodes.map((node) => node.format()).join("\n\n")
      return { kind: "Reparse", nodes: reparse(text) }
    }

    return group
  })

  return groups.flatMap((group) => group.nodes)
}

function reparse(text: string): Array<Node> {
  const groups = groupingXNodes(parse(text))

  return groups.flatMap((group) => {
    if (group.kind === "Text") {
      return parseNodesWithoutHTML(group.text)
    } else {
      return [new Nodes.Element({ element: group.element })]
    }
  })
}
