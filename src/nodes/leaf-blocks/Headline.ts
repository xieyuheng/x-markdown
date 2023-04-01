import { Node } from "../../node"

export type Headline = {
  kind: "Headline"
  level: number
  children: Array<Node>
}
