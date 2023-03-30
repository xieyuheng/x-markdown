import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test.todo("block-quote", () => {
  const text = `\
> Make the change easy, then make the easy change.
>
> -- Kent Beck
`

  const document = parseDocument(text)

  expect(document.children.map((node) => node.json())).toEqual([
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
