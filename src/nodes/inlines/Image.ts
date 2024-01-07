import { type Node } from "../../node/index.js"

export type Image = {
  kind: "Image"
  alt: string
  src: string
  children: Array<Node>
}
