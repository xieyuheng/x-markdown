export abstract class Node {
  abstract kind: string
  abstract json(): any
  children?: Array<Node> = []
  abstract format(): string
}
