import { NodeVisitor } from "../node-visitor"

export abstract class Node {
  abstract kind: string
  abstract json(): any
  abstract shallowCopy(): Node

  children: Array<Node> = []

  accept<T>(visitor: NodeVisitor<T>): T {
    return visitor.default(this)
  }
}
