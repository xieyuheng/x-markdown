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
    return "TODO"
  }
}
