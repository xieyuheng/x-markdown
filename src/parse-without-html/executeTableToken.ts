import { Data } from "./Data"
import { Token } from "./Token"

export function executeTableToken(stack: Array<Data>, token: Token): boolean {
  const who = "executeTableToken"

  if (token.type === "table_open") {
    stack.push({ kind: "Token", token })
    return true
  }

  /* if (token.type === "table_close") {
     const [children, openToken] = collectNodesUntil(stack, "table_open")
     const node = new Nodes.Table({
     children,
     })

     stack.push({ kind: "Node", node })
     return
     } */

  return false
}
