import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("hard-line-break", () => {
  const text = "Hello  \nWorld"
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello" },
        { kind: "HardLineBreak" },
        { kind: "Text", text: "World" },
      ],
    },
  ])
})

test("hard-line-break -- backslash", () => {
  const text = "Hello\\\nWorld"
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello" },
        { kind: "HardLineBreak" },
        { kind: "Text", text: "World" },
      ],
    },
  ])
})
