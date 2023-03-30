import MarkdownIt from "markdown-it"
const md = new MarkdownIt({ html: true })

const text = `\
<x-card />

<x-card>
  Hello world!
</x-card>

<x-card></x-card>

<x-card>

  Hello world!

</x-card>
`

const result = md.parse(text, {})

console.dir(result, { depth: null })
