import { Node } from "../../node"

export type Image = {
  kind: "Image"
  alt: string
  src: string
  children: Array<Node>
}
