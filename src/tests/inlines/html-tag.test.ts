import { test, expect } from "vitest"
import { parseDocument } from "../../parse"

test("html-tag -- self-closing", () => {
  // NOTE A single self-closing tag will be parsed as `HtmlBlock`.

  const text = `

<x />

`
  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([{ kind: "HtmlBlock", text: "<x />" }])
})

test("html-tag", () => {
  const text = `

a <x /> b

`
  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "a " },
        { kind: "HtmlTag", text: "<x />" },
        { kind: "Text", text: " b" },
      ],
    },
  ])
})

test("html-tag -- inline", () => {
  const text = `

a <x> hi </x> b

`
  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "a " },
        { kind: "HtmlTag", text: "<x>" },
        { kind: "Text", text: " hi " },
        { kind: "HtmlTag", text: "</x>" },
        { kind: "Text", text: " b" },
      ],
    },
  ])
})

test("html-tag -- open and close", () => {
  const text = `

<x> hi </x>

`
  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "HtmlTag", text: "<x>" },
        { kind: "Text", text: " hi " },
        { kind: "HtmlTag", text: "</x>" },
      ],
    },
  ])
})
