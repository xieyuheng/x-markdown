import { Parser, ParserOptions } from "../parser"

export function createParser(opts?: ParserOptions): Parser {
  return new Parser(opts)
}
