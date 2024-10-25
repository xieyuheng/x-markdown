import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("code", () => {
  const text = "`console.log('Hello')`"
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Code",
          text: "console.log('Hello')",
        },
      ],
    },
  ])
})

test("code -- HTML", () => {
  const text = `

a \`<x />\` b

`
  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "a " },
        { kind: "Code", text: "<x />" },
        { kind: "Text", text: " b" },
      ],
    },
  ])
})
