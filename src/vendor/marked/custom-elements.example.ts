import { marked } from "marked"

const text = `\
<x-card />

<x-card>
  Hello world!
</x-card>

<x-card> </x-card>

<x-card>

  Hello world!

</x-card>
`

const tokens = marked.lexer(text)
console.dir(tokens, { depth: null })
