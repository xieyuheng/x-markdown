import * as Nodes from "../../nodes/index.js"

export type List = {
  kind: "List"
  children: Array<Nodes.Item>
}
