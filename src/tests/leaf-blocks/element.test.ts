import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test.todo("element -- inline", () => {
  const text = `

<x-card />

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: text.trim(),
    },
  ])
})

test.todo("element", () => {
  const text = `\
<x-card>
  Hello world!
</x-card>
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: text.trim(),
    },
  ])
})
