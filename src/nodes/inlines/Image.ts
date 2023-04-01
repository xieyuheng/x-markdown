import { Node } from "../../node"

export type Image = {
  kind: "Image"
  title: string
  href: string
  children: Array<Node>
}
