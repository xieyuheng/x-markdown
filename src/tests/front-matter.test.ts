import assert from "node:assert"
import { test } from "node:test"
import { parseDocument } from "../parse/index.js"

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

  const document = parseDocument(text)

  assert.deepStrictEqual(document.attributes, {
    title: "Hello world",
    authors: ["xieyuheng", "yuhengxie", "hengxieyu"],
    date: new Date("2021-09-22"),
  })

  assert.deepStrictEqual(document.children, [
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
