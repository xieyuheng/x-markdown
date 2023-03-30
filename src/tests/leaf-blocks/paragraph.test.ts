import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test.todo("paragraph", () => {
  const text = `\
A, B, C!

A! B! C!
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "A, B, C" },
        // NOTE Be careful about this "!"
        { kind: "Text", text: "!" },
      ],
    },
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "A" },
        { kind: "Text", text: "!" },
        { kind: "Text", text: " B" },
        { kind: "Text", text: "!" },
        { kind: "Text", text: " C" },
        { kind: "Text", text: "!" },
      ],
    },
  ])
})
