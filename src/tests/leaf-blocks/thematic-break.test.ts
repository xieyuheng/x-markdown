import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("thematic-break", () => {
  const text = "\n---\n"
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "ThematicBreak",
    },
  ])
})
