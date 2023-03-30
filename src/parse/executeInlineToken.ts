import * as Nodes from "../nodes"
import { Data } from "./Data"
import { Token } from "./Token"

export function executeInlineToken(stack: Array<Data>, token: Token): void {
  const who = "executeInlineToken"

  if (token.type === "text") {
    const node = new Nodes.Text({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
    return
  }

  if (token.type === "code_inline") {
    const node = new Nodes.Code({
      text: token.content,
    })

    stack.push({ kind: "Node", node })
    return
  }

  console.error({
    who,
    message: "unhandled token",
    token,
  })

  throw new Error(`[${who}] unhandled token: ${token.type}`)
}
