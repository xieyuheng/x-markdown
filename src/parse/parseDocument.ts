import { Node } from "../node"
import * as Nodes from "../nodes"
import { parseDocument as parseDocumentWithoutHTML } from "../parse-without-html"
import { Group } from "./Group"
import { reparseNodes } from "./reparseNodes"

export function parseDocument(text: string): Nodes.Document {
  const document = parseDocumentWithoutHTML(text)

  const groups = grouping(document.children)

  const reparsedGroups = groups.map((group) => {
    if (group.kind === "Reparse") {
      const text = group.nodes.map((node) => node.format()).join("\n\n")
      return { kind: "Reparse", nodes: reparseNodes(text) }
    }

    return group
  })

  document.children = reparsedGroups.flatMap((group) => group.nodes)

  return document
}

function grouping(nodes: Array<Node>): Array<Group> {
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
