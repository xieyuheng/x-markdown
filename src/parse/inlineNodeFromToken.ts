import * as Nodes from "../nodes"
import { Token } from "./Token"

export function inlineNodeFromToken(token: Token): Nodes.Inline {
  const who = "inlineNodesFromToken"

  if (token.type === "text") {
    return new Nodes.Text({
      text: token.content,
    })
  }

  throw new Error(`[${who}] unhandled inline token type: ${token.type}`)
}
