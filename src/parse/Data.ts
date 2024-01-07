import { type Node } from "../node/index.js"
import { type TableData } from "./TableData.js"
import { type Token } from "./Token.js"

export type Data =
  | { kind: "Node"; node: Node }
  | { kind: "Token"; token: Token }
  | TableData
