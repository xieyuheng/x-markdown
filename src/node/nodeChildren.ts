import { type Node } from "./Node.js"

export function nodeChildren(node: Node): Array<Node> {
  if (node.kind === "Table") {
    return [
      ...node.head.flatMap((nodes) => nodes),
      ...node.body.flatMap((row) => row.flatMap((nodes) => nodes)),
    ]
  }

  if ("children" in node) {
    return node.children
  }

  return []
}
