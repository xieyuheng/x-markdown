import { type Node } from "../../node/index.js"

export type Link = {
  kind: "Link"
  title: string
  href: string
  children: Array<Node>
}
