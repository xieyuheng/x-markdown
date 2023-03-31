import * as Nodes from ".."
import { Node } from "../../node"

export type Alignment = null | "left" | "right" | "center"

export class Table extends Nodes.LeafBlock {
  kind = "Table"

  children: Array<Node>
  alignments: Array<Alignment>

  constructor(options: {
    children: Array<Node>
    alignments: Array<Alignment>
  }) {
    super()
    this.children = options.children
    this.alignments = options.alignments
  }

  // NOTE We calculate `header` and `rows` from `children` and `alignments`.
  //   note that `children` are wrapped in `Paragraph`.
  // NOTE we view `children` as the source of truth,
  //   because we need to use this constraint in some `NodeVisitor`.

  get width(): number {
    return this.alignments.length
  }

  // NOTE Not including the header.
  get height(): number {
    return Math.floor(this.children.length / this.width) - 1
  }

  get header(): Array<Array<Node>> {
    const wrapped = this.children.slice(0, this.width)
    return wrapped.map((paragraph) => paragraph.children)
  }

  get rows(): Array<Array<Array<Node>>> {
    const body = this.children.slice(this.width)

    const results: Array<Array<Array<Node>>> = []
    for (let i = 0; i < this.height; i++) {
      const start = i * this.width
      const wrapped = body.slice(start, start + this.width)
      results.push(wrapped.map((paragraph) => paragraph.children))
    }

    return results
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
}
