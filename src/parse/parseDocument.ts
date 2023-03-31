import { Node } from "../node"
import * as Nodes from "../nodes"
import { parseDocument as parseDocumentWithoutHTML } from "../parse-without-html"
import { reparseNodes } from "./reparseNodes"

type Group =
  | { kind: "Finial"; nodes: Array<Node> }
  | { kind: "Reparse"; nodes: Array<Node> }

export function parseDocument(text: string): Nodes.Document {
  const document = parseDocumentWithoutHTML(text)

  // Group the top level nodes, some for further XML parsing.
  const groups = grouping(document.children).map((group) => {
    if (group.kind === "Reparse") {
      const text = group.nodes.map((node) => node.format()).join("\n\n")
      return { kind: "Reparse", nodes: reparseNodes(text) }
    }

    return group
  })

  document.children = groups.flatMap((group) => group.nodes)

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
