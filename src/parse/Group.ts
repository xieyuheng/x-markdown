import { Node } from "../node"

export type Group =
  | { kind: "Finial"; nodes: Array<Node> }
  | { kind: "Reparse"; nodes: Array<Node> }
