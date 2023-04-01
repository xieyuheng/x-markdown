export abstract class Node {
  abstract kind: string
  abstract json(): any
  abstract format(): string
}
