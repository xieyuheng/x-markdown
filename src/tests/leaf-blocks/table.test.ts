import { test, expect } from "vitest"
import { createParser } from "../../parser"

test("table", () => {
  const text = `\
| a   | b       | c |
|-----|:-------:|:--|
| *1* | **3**   | 5 |
| 2   | a *4* b | 6 |
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Table",
      alignments: [null, "center", "left"],
      header: [
        [{ kind: "Text", text: "a" }],
        [{ kind: "Text", text: "b" }],
        [{ kind: "Text", text: "c" }],
      ],
      rows: [
        [
          [{ kind: "Emphasis", children: [{ kind: "Text", text: "1" }] }],
          [{ kind: "Strong", children: [{ kind: "Text", text: "3" }] }],
          [{ kind: "Text", text: "5" }],
        ],
        [
          [{ kind: "Text", text: "2" }],
          [
            { kind: "Text", text: "a " },
            { kind: "Emphasis", children: [{ kind: "Text", text: "4" }] },
            { kind: "Text", text: " b" },
          ],
          [{ kind: "Text", text: "6" }],
        ],
      ],
    },
  ])
})

test("table -- empty", () => {
  const text = `\
|   | x | y |
|---|---|---|
| a |   |   |
| b |   |   |
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Table",
      alignments: [null, null, null],
      header: [
        [],
        [{ kind: "Text", text: "x" }],
        [{ kind: "Text", text: "y" }],
      ],
      rows: [
        [[{ kind: "Text", text: "a" }], [], []],
        [[{ kind: "Text", text: "b" }], [], []],
      ],
    },
  ])
})

test("table -- no header", () => {
  // NOTE According to GFM spec, no header no table:
  //   https://github.github.com/gfm/#tables-extension-

  const text = `\
| 1 | 3 | 5 |
| 2 | 4 | 6 |
`

  const document = createParser().parseDocument(text)

  expect(document.children.map(node => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "| 1 | 3 | 5 |" },
        { kind: "SoftLineBreak" },
        { kind: "Text", text: "| 2 | 4 | 6 |" },
      ],
    },
  ])
})
