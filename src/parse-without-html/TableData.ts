import { Node } from "../node"
import { Alignment } from "../nodes"

export type TableData = TableHead | TableBody | TableRow | TableCell

export type TableHead = {
  kind: "TableHead"
  row: Array<Array<Node>>
  alignments: Array<Alignment>
}

export type TableBody = {
  kind: "TableBody"
  rows: Array<Array<Array<Node>>>
}

export type TableRow = {
  kind: "TableRow"
  row: Array<Array<Node>>
  alignments: Array<Alignment>
}

export type TableCell = {
  kind: "TableCell"
  children: Array<Node>
  alignment: Alignment
}
