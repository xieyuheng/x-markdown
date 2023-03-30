import * as Nodes from "."
import { Node, Span } from "../node"

export abstract class ContainerBlock extends Nodes.Block {
  abstract span: Span
  abstract children: Array<Node>

  instanceofContainerBlock = true
}
