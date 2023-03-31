import { Node } from "../node"
import { Alignment } from "../nodes"
import { Token } from "./Token"

export type Data =
  | { kind: "Node"; node: Node }
  | { kind: "Token"; token: Token }
  | { kind: "TableHead"; row: Array<Node>; alignments: Array<Alignment> }
  | { kind: "TableBody"; rows: Array<Array<Node>> }
