import { Node } from "../node"
import * as Nodes from "../nodes"
import { Group } from "./Group"

export function grouping(nodes: Array<Node>): Array<Group> {
  const groups: Array<Group> = []

  for (const node of nodes) {
    if (node instanceof Nodes.CodeBlock) {
      const group = groups.pop()
      if (group === undefined) {
        groups.push({ kind: "Finial", nodes: [node] })
      } else if (group.kind === "Finial") {
        group.nodes.push(node)
        groups.push(group)
      } else {
        groups.push(group)
        groups.push({ kind: "Finial", nodes: [node] })
      }
    } else {
      const group = groups.pop()
      if (group === undefined) {
        groups.push({ kind: "Reparse", nodes: [node] })
      } else if (group.kind === "Reparse") {
        group.nodes.push(node)
        groups.push(group)
      } else {
        groups.push(group)
        groups.push({ kind: "Reparse", nodes: [node] })
      }
    }
  }

  return groups
}
