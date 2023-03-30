import { Parser, ParserOptions } from "../parser"

export function createParser(options?: ParserOptions): Parser {
  return new Parser(options)
}
