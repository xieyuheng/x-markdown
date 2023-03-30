import { createParser } from "../../parser"

{
  const text = '[example link](https://example.com "example title")'
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Link",
          title: "example title",
          href: "https://example.com",
          children: [{ kind: "Text", text: "example link" }],
        },
      ],
    },
  ])
}

{
  const text = `\
[example link][]

[example link]: https://example.com "example title"
`
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Link",
          title: "example title",
          href: "https://example.com",
          children: [{ kind: "Text", text: "example link" }],
        },
      ],
    },
  ])
}

{
  const text = `<https://example.com>`
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "Paragraph",
      children: [
        {
          kind: "Link",
          title: "",
          href: "https://example.com",
          children: [{ kind: "Text", text: "https://example.com" }],
        },
      ],
    },
  ])
}
