import * as Commonmark from "."
import { formatCodeBlock } from "../../utils/formatCodeBlock"

const examples = `\
<x-card />

<x-card>
  Hello world!
</x-card>

<x-card></x-card>

<x-card>

  Hello world!

</x-card>
`

const parser = new Commonmark.Parser()
const document = parser.parse(examples)

console.dir(Commonmark.presentNode(document), { depth: null })
