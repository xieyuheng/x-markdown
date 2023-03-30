import { test, expect } from "vitest"
import { createParser } from "../../parser"

test("soft-break", () => {
  const text = "Hello\nWorld"
  const document = createParser().parseDocument(text)

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
