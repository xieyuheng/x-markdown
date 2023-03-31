import { Node } from "../node"
import { Alignment } from "../nodes"
import { Token } from "./Token"

export type Data =
  | { kind: "Node"; node: Node }
  | { kind: "Token"; token: Token }
  | { kind: "TableCell"; children: Array<Node> }
  | { kind: "TableRow"; row: Array<Array<Node>>; alignments: Array<Alignment> }
  | { kind: "TableHead"; row: Array<Array<Node>>; alignments: Array<Alignment> }
  | { kind: "TableBody"; rows: Array<Array<Array<Node>>> }
