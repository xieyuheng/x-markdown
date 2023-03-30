import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("paragraph", () => {
  const text = `\
A, B, C!

A! B! C!
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "A, B, C!" }],
    },
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "A! B! C!" }],
    },
  ])
})
