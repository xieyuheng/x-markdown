import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("image", () => {
  const text = '![example image](https://example.com "example title")'
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Image",
          alt: "example title",
          src: "https://example.com",
          children: [{ kind: "Text", text: "example image" }],
        },
      ],
    },
  ])
})
