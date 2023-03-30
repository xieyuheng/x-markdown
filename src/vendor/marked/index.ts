import { marked } from"marked"


const md = `
| a | b |
|---|---|
| 1 | 2 |
| 3 | 4 |
`

const tokens = marked.lexer(md)
console.dir(tokens, { depth: null })
