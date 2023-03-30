import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

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

function formatCodeBlock(info: string, text: string): string {
  let s = ""
  s += "``` " + info + "\n"
  s += text + "\n"
  s += "```" + "\n"
  return s
}
