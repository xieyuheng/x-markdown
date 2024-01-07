import { expect, test } from "vitest"
import { parseDocument } from "../../parse/index.js"

test("strong", () => {
  const text = "Hi **there**"
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hi " },
        {
          kind: "Strong",
          children: [{ kind: "Text", text: "there" }],
        },
      ],
    },
  ])
})
