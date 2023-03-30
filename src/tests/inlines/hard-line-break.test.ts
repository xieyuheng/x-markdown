import { createParser } from "../../parser"

{
  const text = "Hello  \nWorld"
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello" },
        { kind: "HardLineBreak" },
        { kind: "Text", text: "World" },
      ],
    },
  ])
}

{
  const text = "Hello\\\nWorld"
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "Paragraph",
      children: [
        { kind: "Text", text: "Hello" },
        { kind: "HardLineBreak" },
        { kind: "Text", text: "World" },
      ],
    },
  ])
}
