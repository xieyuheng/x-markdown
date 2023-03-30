import { test, expect } from "vitest"
import { createParser } from "../../parser"

test('ordered-list--tight', () => {
  const text = `\
A tight ordered list:

6. a
7. b
100. c
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
                               {
                                kind: "Paragraph",
                                children: [{ kind: "Text", text: "A tight ordered list:" }],
                                },
                               {
                                kind: "OrderedList",
                                tight: true,
                                start: 6,
                                delimiter: ".",
                                children: [
                                           {
                                            kind: "OrderedItem",
                                            number: 6,
                                            delimiter: ".",
                                            children: [
                                                       { kind: "Paragraph", children: [{ kind: "Text", text: "a" }] },
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

test ('ordered-list--tight -- with )', () => {
       const text = `\
A tight ordered list:

6) a
7) b
100) c
`

       const document = createParser().parseDocument(text)

       expect(document.children.map(node => node.json())).toEqual([
                                    {
                                     kind: "Paragraph",
                                     children: [{ kind: "Text", text: "A tight ordered list:" }],
                                     },
                                    {
                                     kind: "OrderedList",
                                     tight: true,
                                     start: 6,
                                     delimiter: ")",
                                     children: [
                                                {
                                                 kind: "OrderedItem",
                                                 number: 6,
                                                 delimiter: ")",
                                                 children: [
                                                            { kind: "Paragraph", children: [{ kind: "Text", text: "a" }] },
                                                            ],
                                                 },
                                                {
                                                 kind: "OrderedItem",
                                                 number: 7,
                                                 delimiter: ")",
                                                 children: [
                                                            { kind: "Paragraph", children: [{ kind: "Text", text: "b" }] },
                                                            ],
                                                 },
                                                {
                                                 kind: "OrderedItem",
                                                 number: 100,
                                                 delimiter: ")",
                                                 children: [
                                                            { kind: "Paragraph", children: [{ kind: "Text", text: "c" }] },
                                                            ],
                                                 },
                                                ],
                                     },
                                    ])
       })
