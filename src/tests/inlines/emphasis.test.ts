import { test, expect } from "vitest"
import { parseDocument } from "../../parse"

test('emphasis', () => {
  const text = "Hello *world*"
  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello " },
        {
          kind: "Emphasis",
          children: [{ kind: "Text", text: "world" }],
        },
      ],
    },
  ])
})
