import { expect, test } from "vitest"
import { createParser } from "../../parser"

test('paragraph', () => {
  const text = `\
A, B, C!

A! B! C!
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
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
