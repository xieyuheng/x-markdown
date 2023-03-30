import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test.todo("thematic-break", () => {
  const text = "\n---\n"
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "ThematicBreak",
    },
  ])
})
