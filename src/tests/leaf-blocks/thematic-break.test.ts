import { createParser } from "../../parser"

{
  const text = "\n---\n"
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "ThematicBreak",
    },
  ])
}
