import { XElement, XNode, formatElement, parse } from "@readonlylink/x-node"
import { Node } from "../node"
import * as Nodes from "../nodes"
import { parseNodes as parseNodesWithoutHTML } from "../parse-without-html"

type Group =
  | { kind: "Element"; element: XElement }
  | { kind: "Text"; text: string }

export function reparseNodes(text: string): Array<Node> {
  const nodes = parse(text)

  const groups = grouping(nodes)

  return groups.flatMap((group) => {
    if (group.kind === "Text") {
      return parseNodesWithoutHTML(group.text)
    } else {
      return [new Nodes.Element({ element: group.element })]
    }
  })
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
      const group = groups.pop()
      if (group === undefined) {
        groups.push({ kind: "Element", element: node })
      } else if (group.kind === "Text") {
        if (group.text.endsWith("\n")) {
          groups.push(group)
          groups.push({ kind: "Element", element: node })
        } else {
          // The element is not at the top-level (maybe in `...`),
          // should be reparsed by markdown parser again.
          group.text += formatElement(node)
          groups.push(group)
        }
      } else {
        groups.push(group)
        groups.push({ kind: "Element", element: node })
      }
    }
  }

  return groups
}
