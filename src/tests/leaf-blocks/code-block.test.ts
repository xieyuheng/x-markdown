import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("code-block", () => {
  // NOTE The info line will be trimed
  const text = `
\`\`\`    sisuo
console.log('Hello')
\`\`\`
`

  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "CodeBlock",
      info: "sisuo",
      text: "console.log('Hello')\n",
    },
  ])
})

test("code-block -- xml", () => {
  const text = `
\`\`\`xml
<x> hi </x>
\`\`\`
`

  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "CodeBlock",
      info: "xml",
      text: "<x> hi </x>\n",
    },
  ])
})

test("code-block -- indentation", () => {
  const text = `

    <x> hi </x>

`

  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "CodeBlock",
      info: "",
      text: "<x> hi </x>\n",
    },
  ])
})
