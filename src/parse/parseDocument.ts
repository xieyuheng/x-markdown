import { Node } from "../node"
import * as Nodes from "../nodes"
import { parseDocument as parseDocumentWithoutHTML } from "../parse-without-html"

export function parseDocument(text: string): Nodes.Document {
  const document = parseDocumentWithoutHTML(text)

  // Group the top level nodes, some for further XML parsing.
  const groups = grouping(document.children)
  // groups.map(group)
  // console.log(groups)

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
        groups.push({ kind: "Ongoing", nodes: [node] })
      } else if (group.kind === "Ongoing") {
        group.nodes.push(node)
        groups.push(group)
      } else {
        groups.push(group)
        groups.push({ kind: "Ongoing", nodes: [node] })
      }
    }
  }

  return groups
}

type Group =
  | { kind: "Finial"; nodes: Array<Node> }
  | { kind: "Ongoing"; nodes: Array<Node> }
