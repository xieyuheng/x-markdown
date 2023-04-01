import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("footnote-ref -- no footnote no ref", () => {
  const text = `

a [^1] b [^hi]

`
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "a [^1] b [^hi]" }],
    },
  ])
})
