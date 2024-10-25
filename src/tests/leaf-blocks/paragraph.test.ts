import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("paragraph", () => {
  const text = `\
A, B, C!

A! B! C!
`

  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "A, B, C!" }],
    },
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "A! B! C!" }],
    },
  ])
})
