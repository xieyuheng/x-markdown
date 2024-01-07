import { expect, test } from "vitest"
import { parseDocument } from "../../parse/index.js"

test("bullet-list--tight", () => {
  const text = `\
A tight list:
- a
- b
- c
`

  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "A tight list:" }],
    },
    {
      kind: "List",
      children: [
        {
          kind: "Item",
          children: [
            { kind: "Paragraph", children: [{ kind: "Text", text: "a" }] },
          ],
        },
        {
          kind: "Item",
          children: [
            { kind: "Paragraph", children: [{ kind: "Text", text: "b" }] },
          ],
        },
        {
          kind: "Item",
          children: [
            { kind: "Paragraph", children: [{ kind: "Text", text: "c" }] },
          ],
        },
      ],
    },
  ])
})
