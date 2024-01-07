import { expect, test } from "vitest"
import { parseDocument } from "../../parse/index.js"

test("html-inline", () => {
  const text = `

a <x> hi </x> b

`
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "a " },
        { kind: "HtmlInline", text: "<x>" },
        { kind: "Text", text: " hi " },
        { kind: "HtmlInline", text: "</x>" },
        { kind: "Text", text: " b" },
      ],
    },
  ])
})

test("html-inline -- unicode can not be handled", () => {
  const text = `

a <卡片> hi </卡片> b

`
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "a <卡片> hi </卡片> b" }],
    },
  ])
})

test("html-inline -- self-closing", () => {
  const text = `

a <x /> b

`
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "a " },
        { kind: "HtmlInline", text: "<x />" },
        { kind: "Text", text: " b" },
      ],
    },
  ])
})
