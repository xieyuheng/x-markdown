import { expect, test } from "vitest"
import * as Nodes from "../nodes"
import { parseDocument } from "../parse"

test("front-matter", () => {
  const text = `\
---
title: Hello world
authors: [xieyuheng, yuhengxie, hengxieyu]
date: 2021-09-22
---

# Hiya

Hi Hi Yo Yo
`

  const document: Nodes.Document = parseDocument(text)

  expect(document.attributes).toEqual({
    title: "Hello world",
    authors: ["xieyuheng", "yuhengxie", "hengxieyu"],
    date: new Date("2021-09-22"),
  })

  expect(document.children.map((node) => node.json())).toEqual([
    {
      kind: "Headline",
      level: 1,
      children: [{ kind: "Text", text: "Hiya" }],
    },
    {
      kind: "Paragraph",
      children: [{ kind: "Text", text: "Hi Hi Yo Yo" }],
    },
  ])
})
