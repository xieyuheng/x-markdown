import { type Node } from "../../node/index.js"

export type Headline = {
  kind: "Headline"
  level: number
  children: Array<Node>
}
