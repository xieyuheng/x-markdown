import { parse } from "@readonlylink/x-node"
import { Node } from "../node"
import * as Nodes from "../nodes"
import { parseNodes } from "../parse"
import { groupingNodesForReparse } from "./groupingNodesForReparse"
import { groupingXNodes } from "./groupingXNodes"

export function reparseNodes(nodes: Array<Node>): Array<Node> {
  const groups = groupingNodesForReparse(nodes).map((group) => {
    if (group.kind === "Reparse") {
      const text = group.nodes.map((node) => node.format()).join("\n\n")
      const groups = groupingXNodes(parse(text))

      if (!groups.find((group) => group.kind === "Element")) {
        return group
      }

      const nodes = groups.flatMap((group) => {
        if (group.kind === "Text") {
          return parseNodes(group.text)
        } else {
          return [new Nodes.Element({ element: group.element })]
        }
      })

      return { kind: "Reparse", nodes }
    }

    return group
  })

  return groups.flatMap((group) => group.nodes)
}
