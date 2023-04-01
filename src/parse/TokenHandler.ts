import { Context } from "./Context"
import { Token } from "./Token"

export type TokenHandler = (ctx: Context, token: Token) => void
