import { test } from "vitest"
import { parseDocument } from "../parse/index.js"
import { traverseDocument } from "./traverseDocument.js"

test("traverseDocument", () => {
  const text = `\
---
title: Hello world
authors: [xieyuheng, yuhengxie, hengxieyu]
date: 2021-09-22
---

# Hiya

Hi Hi Yo Yo

![example image](https://example.com "example title")
`

  const document = parseDocument(text)

  for (const node of traverseDocument(document)) {
    console.log(node)
  }
})
