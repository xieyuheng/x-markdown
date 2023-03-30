import { test, expect } from "vitest"
import { createParser } from "../../parser"

test('emphasis', () => {
  const text = "Hello *world*"
  const document = createParser().parseDocument(text)

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
