import { Data } from "./Data"
import { Footnote } from "./Footnote"

export type Context = {
  stack: Array<Data>
  footnotes: Array<Footnote>
}
