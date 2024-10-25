import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("strong", () => {
  const text = "Hi **there**"
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hi " },
        {
          kind: "Strong",
          children: [{ kind: "Text", text: "there" }],
        },
      ],
    },
  ])
})
