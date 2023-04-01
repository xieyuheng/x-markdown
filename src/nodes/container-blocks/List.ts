import * as Nodes from "../../nodes"

export type List = {
  kind: "List"
  children: Array<Nodes.Item>
}
