import * as Nodes from ".."

export class List extends Nodes.ContainerBlock {
  kind = "List"

  tight: boolean
  children: Array<Nodes.Item>

  constructor(options: { children: Array<Nodes.Item>; tight: boolean }) {
    super()
    this.tight = options.tight
    this.children = options.children
  }

  json() {
    return {
      kind: this.kind,
      tight: this.tight,
      children: this.children.map((child) => child.json()),
    }
  }
}
