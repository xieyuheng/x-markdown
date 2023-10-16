import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("image", () => {
  const text = '![example image](https://example.com "example title")'
  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Image",
          alt: "example title",
          src: "https://example.com",
          children: [{ kind: "Text", text: "example image" }],
        },
      ],
    },
  ])
})
