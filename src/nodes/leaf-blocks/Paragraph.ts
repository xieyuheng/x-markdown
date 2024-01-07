import { type Node } from "../../node/index.js"

export type Paragraph = {
  kind: "Paragraph"
  children: Array<Node>
}
