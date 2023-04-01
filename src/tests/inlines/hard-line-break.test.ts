import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("hard-line-break", () => {
  const text = "Hello  \nWorld"
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello" },
        { kind: "HardLineBreak" },
        { kind: "Text", text: "World" },
      ],
    },
  ])
})

test("hard-line-break -- backslash", () => {
  const text = "Hello\\\nWorld"
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello" },
        { kind: "HardLineBreak" },
        { kind: "Text", text: "World" },
      ],
    },
  ])
})
