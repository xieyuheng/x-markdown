import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("element -- inline", () => {
  const text = `

<x-card />

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Element",
      element: {
        tag: "x-card",
        attributes: {},
        children: [],
      },
    },
  ])
})

test("element", () => {
  const text = `\
<x-card a="1">
  Hello world!
</x-card>
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Element",
      element: {
        tag: "x-card",
        attributes: { a: "1" },
        children: ["\nHello world!\n"],
      },
    },
  ])
})

test("element -- commonmark can not do this", () => {
  const text = `\
<x-card a="1">

Hello world!

</x-card>
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Element",
      element: {
        tag: "x-card",
        attributes: { a: "1" },
        children: ["\n\nHello world!\n\n"],
      },
    },
  ])
})
