import { createParser } from "../../parser"

{
  const text = "`console.log('Hello')`"
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Code",
          text: "console.log('Hello')",
        },
      ],
    },
  ])
}
