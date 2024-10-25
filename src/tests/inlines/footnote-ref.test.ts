import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("footnote-ref -- no footnote no ref", () => {
  const text = `

a [^1] b [^hi]

`
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "a [^1] b [^hi]" }],
    },
  ])
})
