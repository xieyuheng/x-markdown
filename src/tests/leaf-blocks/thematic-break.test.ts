import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("thematic-break", () => {
  const text = "\n---\n"
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "ThematicBreak",
    },
  ])
})
