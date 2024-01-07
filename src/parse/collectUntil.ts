import { type Data } from "./Data.js"
import { type Token } from "./Token.js"

export function collectUntil(
  stack: Array<Data>,
  type: string,
): [Array<Data>, Token] {
  const who = "collectUntil"

  const results: Array<Data> = []

  while (true) {
    const data = stack.pop()
    if (data === undefined) {
      throw new Error(
        `[${who}] expecting token type: ${type}, the stack is empty`,
      )
    }

    if (data.kind === "Token" && data.token.type === type) {
      return [results, data.token]
    }

    results.unshift(data)
  }
}
