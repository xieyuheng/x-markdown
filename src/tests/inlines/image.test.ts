import { test, expect } from "vitest"
import { createParser } from "../../parser"

test ("image", () => {
  const text = '![example image](https://example.com "example title")'
  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Image",
          title: "example title",
          href: "https://example.com",
          children: [{ kind: "Text", text: "example image" }],
        },
      ],
    },
  ])
})
