import { type Context } from "./Context.js"
import { type Token } from "./Token.js"

export type TokenHandler = (ctx: Context, token: Token) => void
