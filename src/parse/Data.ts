import { Node } from "../node"
import { TableData } from "./TableData"
import { Token } from "./Token"

export type Data =
  | { kind: "Node"; node: Node }
  | { kind: "Token"; token: Token }
  | TableData
