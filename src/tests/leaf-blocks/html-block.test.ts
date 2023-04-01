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

test.todo("html block -- empty", () => {
  const text = `

<x-card></x-card>

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: "<x-card>x</x-card>\n",
    },
  ])
})

test.todo("html block -- in one line", () => {
  const text = `

<x-card> hi </x-card>

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "HtmlBlock",
      text: "<x-card>x</x-card>\n",
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
