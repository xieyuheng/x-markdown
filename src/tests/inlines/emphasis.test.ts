import { expect, test } from "vitest"
import { parseDocument } from "../../parse/index.js"

test("emphasis", () => {
  const text = "Hello *world*"
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello " },
        {
          kind: "Emphasis",
          children: [{ kind: "Text", text: "world" }],
        },
      ],
    },
  ])
})
