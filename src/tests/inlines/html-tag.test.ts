import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test.todo("inline-element", () => {
  const text = `

a <x> hi </x> b

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "a <x> hi </x> b" }],
    },
  ])
})

test.todo("inline-element -- self-closing normalized", () => {
  const text = `

a <x /> b

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "a" }],
    },
  ])
})
