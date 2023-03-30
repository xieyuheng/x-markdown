import { test, expect } from "vitest"
import { parseDocument } from "../../parse"

test("html-block -- inline", () => {
  const text = `

<x-card />

`
  const document = parseDocument(text)

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

  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: text.trim(),
    },
  ])
})
