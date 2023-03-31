import * as Nodes from "../nodes"
import { collectNodesUntil } from "./collectNodesUntil"
import { TokenHandler } from "./TokenHandler"

export const tokenRoutes: Record<string, TokenHandler> = {
  heading_open: (stack, token) => stack.push({ kind: "Token", token }),

  heading_close: (stack, token) => {
    const [children] = collectNodesUntil(stack, "heading_open")
    const levelRecord: Record<string, number> = {
      h1: 1,
      h2: 2,
      h3: 3,
      h4: 4,
      h5: 5,
      h6: 6,
    }

    const level = levelRecord[token.tag]
    const node = new Nodes.Headline({ level, children })
    stack.push({ kind: "Node", node })
  },
}
