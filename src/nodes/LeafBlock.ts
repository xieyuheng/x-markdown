import * as Nodes from "."
import { Span } from "../node"

export abstract class LeafBlock extends Nodes.Block {
  abstract span: Span

  instanceofLeafBlock = true
}
