import { expect, test } from "vitest"
import { parseDocument } from "../parse"

test("footnote", () => {
  const text = `\
note ^[hiya]

a [^1] b [^hi]

[^1]: footnote 1

paragraph in between will be hoisted.

[^hi]: footnote hi

    subsequent paragraphs are indented (at least 4 spaces) to show that they belong to the previous footnote.

`

  const document = parseDocument(text)

  expect(
    document.footnotes.map((footnote) => ({
      ...footnote,
      nodes: footnote.nodes.map((node) => node.json()),
    })),
  ).toEqual([
    {
      id: 0,
      name: undefined,
      nodes: [
        {
          kind: "Paragraph",
          children: [{ kind: "Text", text: "hiya" }],
        },
      ],
    },
    {
      id: 1,
      name: "1",
      nodes: [
        {
          kind: "Paragraph",
          children: [{ kind: "Text", text: "footnote 1" }],
        },
      ],
    },
    {
      id: 2,
      name: "hi",
      nodes: [
        {
          kind: "Paragraph",
          children: [{ kind: "Text", text: "footnote hi" }],
        },

        {
          kind: "Paragraph",
          children: [
            {
              kind: "Text",
              text: "subsequent paragraphs are indented (at least 4 spaces) to show that they belong to the previous footnote.",
            },
          ],
        },
      ],
    },
  ])

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "note " },
        { kind: "FootnoteRef", id: 0, name: undefined },
      ],
    },
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "a " },
        { kind: "FootnoteRef", id: 1, name: "1" },
        { kind: "Text", text: " b " },
        { kind: "FootnoteRef", id: 2, name: "hi" },
      ],
    },
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "paragraph in between will be hoisted." },
      ],
    },
  ])
})
