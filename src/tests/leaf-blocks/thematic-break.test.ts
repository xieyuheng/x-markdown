import { test, expect } from "vitest"
import { createParser } from "../../parser"

test("thematic-break", () => {
  const text = "\n---\n"
  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "ThematicBreak",
    },
  ])
})
