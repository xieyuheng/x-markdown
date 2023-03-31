import { XElement, formatElement } from "@readonlylink/x-node"
import * as Nodes from ".."

export class Element extends Nodes.LeafBlock {
  kind = "Element"

  element: XElement

  constructor(options: { element: XElement }) {
    super()
    this.element = options.element
  }

  json() {
    return {
      kind: this.kind,
      element: this.element,
    }
  }

  format(): string {
    return formatElement(this.element)
  }
}
