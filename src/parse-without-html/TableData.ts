import { Node } from "../node"
import { Alignment } from "../nodes"

export type TableData =
  | { kind: "TableCell"; children: Array<Node> }
  | { kind: "TableRow"; row: Array<Array<Node>>; alignments: Array<Alignment> }
  | { kind: "TableHead"; row: Array<Array<Node>>; alignments: Array<Alignment> }
  | { kind: "TableBody"; rows: Array<Array<Array<Node>>> }
