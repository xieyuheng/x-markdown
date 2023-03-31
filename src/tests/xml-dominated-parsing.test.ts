import { test } from "vitest"
import * as Nodes from "../nodes"
import { parseDocument } from "../parse"

test("xml-dominated-parsing", () => {
  const text = `\
# Hiya

\`\`\`
<x>hi</x>
\`\`\`

<x>hi</x>

Hi Hi Yo Yo
`

  const document: Nodes.Document = parseDocument(text)

  // expect(document.children.map((node) => node.json())).toEqual([
  //   {
  //     kind: "Headline",
  //     level: 1,
  //     children: [{ kind: "Text", text: "Hiya" }],
  //   },
  //   {
  //     kind: "Paragraph",
  //     children: [{ kind: "Text", text: "Hi Hi Yo Yo" }],
  //   },
  // ])
})
