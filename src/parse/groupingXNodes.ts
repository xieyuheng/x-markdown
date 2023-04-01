import { XElement, XNode } from "@readonlylink/x-node"

type Group =
  | { kind: "Element"; element: XElement }
  | { kind: "Text"; text: string }

export function groupingXNodes(nodes: Array<XNode>): Array<Group> {
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
        groups.push(group)
        groups.push({ kind: "Element", element: node })
      } else {
        groups.push(group)
        groups.push({ kind: "Element", element: node })
      }
    }
  }

  return groups
}
