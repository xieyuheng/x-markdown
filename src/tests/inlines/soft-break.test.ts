import { expect, test } from "vitest"
import { parseDocument } from "../../parse/index.js"

test("soft-break", () => {
  const text = "Hello\nWorld"
  const document = parseDocument(text)

  expect(document.children).toEqual([
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
