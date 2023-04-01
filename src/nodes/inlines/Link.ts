import { Node } from "../../node"

export type Link = {
  kind: "Link"
  title: string
  href: string
  children: Array<Node>
}
