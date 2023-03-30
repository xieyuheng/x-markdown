import { createParser } from "../../parser"

{
  const text = `\
> Make the change easy, then make the easy change.
>
> -- Kent Beck
`

  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "BlockQuote",
      children: [
        {
          kind: "Paragraph",
          children: [
            {
              kind: "Text",
              text: "Make the change easy, then make the easy change.",
            },
          ],
        },
        {
          kind: "Paragraph",
          children: [{ kind: "Text", text: "-- Kent Beck" }],
        },
      ],
    },
  ])
}
