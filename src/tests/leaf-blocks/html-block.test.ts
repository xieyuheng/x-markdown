import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("html block -- self-closing", () => {
  const text = `

<x-card />

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: "<x-card />\n",
    },
  ])
})

test("html block -- one line will be viewed as inline", () => {
  const text = `

<x-card> hi </x-card>

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "HtmlInline", text: "<x-card>" },
        { kind: "Text", text: " hi " },
        { kind: "HtmlInline", text: "</x-card>" },
      ],
    },
  ])
})

test("html block -- one line will be viewed as inline -- empty", () => {
  const text = `

<x-card></x-card>

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "HtmlInline", text: "<x-card>" },
        { kind: "HtmlInline", text: "</x-card>" },
      ],
    },
  ])
})

test("html block -- unicode can not be handled", () => {
  const text = `\
<卡片>
Hello world!
</卡片>
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "<卡片>" },
        { kind: "SoftLineBreak" },
        { kind: "Text", text: "Hello world!" },
        { kind: "SoftLineBreak" },
        { kind: "Text", text: "</卡片>" },
      ],
    },
  ])
})

test("html block", () => {
  const text = `\
<x-card a="1">
Hello world!
</x-card>
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: `\
<x-card a="1">
Hello world!
</x-card>
`,
    },
  ])
})

test("html block -- with space", () => {
  const text = `\
<x-card a="1">
  Hello world!
</x-card>
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: `\
<x-card a="1">
  Hello world!
</x-card>
`,
    },
  ])
})

test("html block -- can not handle newline", () => {
  const text = `\
<x-card a="1">

Hello world!

</x-card>
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    { kind: "HtmlBlock", text: '<x-card a="1">\n' },
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "Hello world!" }],
    },
    { kind: "HtmlBlock", text: "</x-card>\n" },
  ])
})
