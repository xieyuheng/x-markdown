import * as Nodes from "."
import { Node } from "../node"

export abstract class ContainerBlock extends Nodes.Block {
  abstract children: Array<Node>

  instanceofContainerBlock = true
}
