import { expect, test } from "vitest"
import { parseDocument } from "../../parse/index.js"

test("footnote-ref -- no footnote no ref", () => {
  const text = `

a [^1] b [^hi]

`
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "a [^1] b [^hi]" }],
    },
  ])
})
