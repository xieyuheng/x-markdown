import { createParser } from "../../parser"

{
  const text = "Hello *world*"
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello " },
        {
          kind: "Emphasis",
          children: [{ kind: "Text", text: "world" }],
        },
      ],
    },
  ])
}
