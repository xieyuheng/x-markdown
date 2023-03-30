import { test, expect } from "vitest"
import { createParser } from "../../parser"

test('bullet-list--loose', () => {
  const text = `\
A loose list:
- a
  a
  a

- b

- c
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
                               {
                                kind: "Paragraph",
                                children: [{ kind: "Text", text: "A loose list:" }],
                                },
                               {
                                kind: "List",
                                tight: false,
                                children: [
                                           {
                                            kind: "Item",
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
                                            kind: "Item",
                                            children: [
                                                       { kind: "Paragraph", children: [{ kind: "Text", text: "b" }] },
                                                       ],
                                            },
                                           {
                                            kind: "Item",
                                            children: [
                                                       { kind: "Paragraph", children: [{ kind: "Text", text: "c" }] },
                                                       ],
                                            },
                                           ],
                                },
                               ])
  })
