import { parseNodes, XElement, XNode } from "@readonlylink/x-node"
import { Node } from "../node"
import { parseNodes as parseNodesWithoutHTML } from "../parse-without-html"

type Group =
  | { kind: "Element"; element: XElement }
  | { kind: "Text"; text: string }

export function reparseNodes(text: string): Array<Node> {
  const nodes = parseNodes(text)

  const groups = grouping(nodes)

  return parseNodesWithoutHTML(text)
}

function grouping(nodes: Array<XNode>): Array<Group> {
  const groups: Array<Group> = []

  for (const node of nodes) {
    if (typeof node === "string") {
      const group = groups.pop()
      if (group === undefined) {
        groups.push({ kind: "Text", text: node })
      } else if (group.kind === "Text") {
        group.text += node
        groups.push(group)
      } else {
        groups.push(group)
        groups.push({ kind: "Text", text: node })
      }
    } else {
      // Only top level element are handled here.
      groups.push({ kind: "Element", element: node })
    }
  }

  return groups
}
