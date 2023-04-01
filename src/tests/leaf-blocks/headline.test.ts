import { expect, test } from "vitest"
import { parseDocument } from "../../parse"

test("headline", () => {
  const text = `\

# headline 1
## headline 2
### headline 3
`

  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Headline",
      level: 1,
      children: [{ kind: "Text", text: "headline 1" }],
    },
    {
      kind: "Headline",
      level: 2,
      children: [{ kind: "Text", text: "headline 2" }],
    },
    {
      kind: "Headline",
      level: 3,
      children: [{ kind: "Text", text: "headline 3" }],
    },
  ])
})

test("headline -- with underline", () => {
  const text = `\
headline 1
==========

headline 2
----------
`

  const document = parseDocument(text)

  expect(document.children).toEqual([
    {
      kind: "Headline",
      level: 1,
      children: [{ kind: "Text", text: "headline 1" }],
    },
    {
      kind: "Headline",
      level: 2,
      children: [{ kind: "Text", text: "headline 2" }],
    },
  ])
})
