import { test, expect } from "vitest"
import { createParser } from "../../parser"

test("block-quote", () => {
  const text = `\
> Make the change easy, then make the easy change.
>
> -- Kent Beck
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "BlockQuote",
      children: [
        {
          kind: "Paragraph",
          children: [
            {
              kind: "Text",
              text: "Make the change easy, then make the easy change.",
            },
          ],
        },
        {
          kind: "Paragraph",
          children: [{ kind: "Text", text: "-- Kent Beck" }],
        },
      ],
    },
  ])
})
