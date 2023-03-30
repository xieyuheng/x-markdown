import { test, expect } from "vitest"
import { createParser } from "../../parser"

test("html-block -- inline", () => {
  const text = `

<x-card />

`
  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: text.trim(),
    },
  ])
})

test("html-block", () => {
  const text = `\
<x-card>
  Hello world!
</x-card>
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: text.trim(),
    },
  ])
})
