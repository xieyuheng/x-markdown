import { test, expect } from "vitest"
import { parseDocument } from "../../parse"

test('code', () => {
  const text = "`console.log('Hello')`"
  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Code",
          text: "console.log('Hello')",
        },
      ],
    },
  ])
})
