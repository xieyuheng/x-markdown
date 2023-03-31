import * as Nodes from "../nodes"
import { parseDocument as parseDocumentWithoutHTML } from "../parse-without-html"
import { grouping } from "./grouping"
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
