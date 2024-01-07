import { expect, test } from "vitest"
import { parseDocument } from "../../parse/index.js"

test("thematic-break", () => {
  const text = "\n---\n"
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "ThematicBreak",
    },
  ])
})
