import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../../parse/index.js"

test("ordered-list--loose", () => {
  const text = `\
A loose ordered list:

6. a
   a
   a

7. b

100. c
`

  const document = parseDocument(text)

  assert.deepStrictEqual(document.children, [
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "A loose ordered list:" }],
    },
    {
      kind: "OrderedList",
      start: 6,
      delimiter: ".",
      children: [
        {
          kind: "OrderedItem",
          number: 6,
          delimiter: ".",
          children: [
            {
              kind: "Paragraph",
              children: [
                { kind: "Text", text: "a" },
                { kind: "SoftLineBreak" },
                { kind: "Text", text: "a" },
                { kind: "SoftLineBreak" },
                { kind: "Text", text: "a" },
              ],
            },
          ],
        },
        {
          kind: "OrderedItem",
          number: 7,
          delimiter: ".",
          children: [
            { kind: "Paragraph", children: [{ kind: "Text", text: "b" }] },
          ],
        },
        {
          kind: "OrderedItem",
          number: 100,
          delimiter: ".",
          children: [
            { kind: "Paragraph", children: [{ kind: "Text", text: "c" }] },
          ],
        },
      ],
    },
  ])
})
