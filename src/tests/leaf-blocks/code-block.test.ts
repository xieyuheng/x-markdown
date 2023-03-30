import { expect, test } from "vitest"
import { parseDocument } from "../../parse"
import { formatCodeBlock } from "../../utils/formatCodeBlock"

test("code-block", () => {
  // NOTE The info line will be trimed
  const text = formatCodeBlock("    sisuo    ", "console.log('Hello')")
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "CodeBlock",
      info: "sisuo",
      text: "console.log('Hello')\n",
    },
  ])
})
