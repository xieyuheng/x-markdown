import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test.todo("element -- self-closing", () => {
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

test.todo("element -- empty", () => {
  const text = `

<x-card></x-card>

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

test.todo("element", () => {
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

test.todo("element -- commonmark can not do this", () => {
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
