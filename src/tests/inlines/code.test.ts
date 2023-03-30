import { test, expect } from "vitest"
import { createParser } from "../../parser"

test('code', () => {
  const text = "`console.log('Hello')`"
  const document = createParser().parseDocument(text)

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
