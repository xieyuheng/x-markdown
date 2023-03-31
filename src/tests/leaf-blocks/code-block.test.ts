import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("code-block", () => {
  // NOTE The info line will be trimed
  const text = `
\`\`\`    sisuo
console.log('Hello')
\`\`\`
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "CodeBlock",
      info: "sisuo",
      text: "console.log('Hello')\n",
    },
  ])
})

test("code-block -- xml", () => {
  // NOTE The info line will be trimed
  const text = `
\`\`\`xml
<x> hi </x>
\`\`\`
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "CodeBlock",
      info: "xml",
      text: "<x> hi </x>\n",
    },
  ])
})
