import { test, expect } from "vitest"
import { parseDocument } from "../../parse"

test("soft-break", () => {
  const text = "Hello\nWorld"
  const document = parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello" },
        { kind: "SoftLineBreak" },
        { kind: "Text", text: "World" },
      ],
    },
  ])
})
