import { type Data } from "./Data.js"
import { type Footnote } from "./Footnote.js"

export type Context = {
  stack: Array<Data>
  footnotes: Array<Footnote>
}

export function createEmptyContext() {
  return {
    stack: [],
    footnotes: [],
  }
}
