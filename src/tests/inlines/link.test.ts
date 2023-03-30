import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("link", () => {
  const text = '[example link](https://example.com "example title")'
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Link",
          title: "example title",
          href: "https://example.com",
          children: [{ kind: "Text", text: "example link" }],
        },
      ],
    },
  ])
})

test("link -- named", () => {
  const text = `\
[example link][]

[example link]: https://example.com "example title"
`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Link",
          title: "example title",
          href: "https://example.com",
          children: [{ kind: "Text", text: "example link" }],
        },
      ],
    },
  ])
})

test("link -- <...>", () => {
  const text = `<https://example.com>`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Link",
          title: "",
          href: "https://example.com",
          children: [{ kind: "Text", text: "https://example.com" }],
        },
      ],
    },
  ])
})
