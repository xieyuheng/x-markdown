import { Node } from "../../node"
import * as Nodes from "../../nodes"

export type Alignment = null | "left" | "right" | "center"

export class Table extends Nodes.LeafBlock {
  kind = "Table"

  alignments: Array<Alignment>
  head: Array<Array<Node>>
  body: Array<Array<Array<Node>>>

  constructor(options: {
    alignments: Array<Alignment>
    head: Array<Array<Node>>
    body: Array<Array<Array<Node>>>
  }) {
    super()
    this.alignments = options.alignments
    this.head = options.head
    this.body = options.body
  }

  json() {
    return {
      kind: this.kind,
      alignments: this.alignments,
      head: this.head.map((nodes) => nodes.map((node) => node.json())),
      body: this.body.map((row) =>
        row.map((nodes) => nodes.map((node) => node.json())),
      ),
    }
  }

  format(): string {
    const head = formatRow(this.head)

    const alignments =
      "|" + this.alignments.map(formatAlignment).join("|") + "|"

    const body = this.body.map(formatRow)

    return [head, alignments, ...body].join("\n")
  }
}

function formatAlignment(alignment: Alignment): string {
  switch (alignment) {
    case "left":
      return ":--"
    case "right":
      return "--:"
    case "center":
      return ":-:"
    default:
      return "---"
  }
}

function formatRow(row: Array<Array<Node>>): string {
  return (
    "|" +
    row
      .map((nodes) => nodes.map((node) => node.format()).join(""))
      .join(" | ") +
    "|"
  )
}
