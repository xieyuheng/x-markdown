import * as Nodes from "../nodes"
import { collectNodesUntil } from "./collectNodesUntil"
import { headlineLevelRecord } from "./headlineLevelRecord"
import { TokenHandler } from "./TokenHandler"

export const tokenRoutes: Record<string, TokenHandler> = {
  heading_open: (stack, token) => stack.push({ kind: "Token", token }),

  heading_close: (stack, token) => {
    const [children] = collectNodesUntil(stack, "heading_open")
    const level = headlineLevelRecord[token.tag]
    const node = new Nodes.Headline({ level, children })
    stack.push({ kind: "Node", node })
  },
}
