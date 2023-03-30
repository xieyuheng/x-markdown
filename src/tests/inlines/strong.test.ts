import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test.todo("strong", () => {
  const text = "Hi **there**"
  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
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
