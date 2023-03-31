import * as Nodes from ".."
import { Node } from "../../node"

export type Alignment = null | "left" | "right" | "center"

export class Table extends Nodes.LeafBlock {
  kind = "Table"

  alignments: Array<Alignment>
  header: Array<Array<Node>>
  rows: Array<Array<Array<Node>>>

  constructor(options: {
    alignments: Array<Alignment>
    header: Array<Array<Node>>
    rows: Array<Array<Array<Node>>>
  }) {
    super()
    this.alignments = options.alignments
    this.header = options.header
    this.rows = options.rows
  }

  json() {
    return {
      kind: this.kind,
      alignments: this.alignments,
      header: this.header.map((nodes) => nodes.map((node) => node.json())),
      rows: this.rows.map((row) =>
        row.map((nodes) => nodes.map((node) => node.json())),
      ),
    }
  }

  format(): string {
    const header = formatRow(this.header)

    const alignments =
      "|" + this.alignments.map(formatAlignment).join(" | ") + "|"

    const rows = this.rows.map(formatRow)

    return [header, alignments, ...rows].join("\n")
  }
}

function formatAlignment(alignment: Alignment): string {
  switch (alignment) {
    case "left":
      return ":--"
    case "right":
      return "--:"
    case "right":
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
