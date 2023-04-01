import { Node } from "../../node"

export type Alignment = null | "left" | "right" | "center"

export class Table extends Node {
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
}
