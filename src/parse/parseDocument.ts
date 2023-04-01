import * as Nodes from "../nodes"
import { parseDocument as parseDocumentWithoutHTML } from "../parse-without-html"
import { groupingNodesForReparse } from "./groupingNodesForReparse"
import { reparseNodes } from "./reparseNodes"

export function parseDocument(text: string): Nodes.Document {
  const document = parseDocumentWithoutHTML(text)

  // Group the top level nodes, some for further HTML parsing.
  const groups = groupingNodesForReparse(document.children).map((group) => {
    if (group.kind === "Reparse") {
      const text = group.nodes.map((node) => node.format()).join("\n\n")
      return { kind: "Reparse", nodes: reparseNodes(text) }
    }

    return group
  })

  document.children = groups.flatMap((group) => group.nodes)

  return document
}
