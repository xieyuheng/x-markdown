# X Markdown

A stable Markdown AST to protect myself from switching upstream parser and upstream API changes.

## Install

```bash
npm i @readonlylink/x-markdown
```

## Docs

Node: (see [commonmark](https://spec.commonmark.org/current))

- ContainerBlock
  - BlockQuote
  - List
  - Item
  - OrderedList
  - OrderedItem
- LeafBlock
  - Paragraph
  - Table
  - ThematicBreak
  - Headline
  - CodeBlock
  - HtmlBlock
- Inline
  - Code
  - Emphasis
  - Strong
  - Link
  - HardLineBreak
  - SoftLineBreak
  - Text
  - FootnoteRef

## Development

```
npm install    // Install dependencies
npm run build  // Compile `src/` to `lib/`
npm run watch  // Watch the compilation
npm run test   // Run test
```

## Contributions

> Be polite, do not bring negative emotion to others.

- [TODO.md](TODO.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md)
- [CODE-OF-CONDUCT.md](CODE-OF-CONDUCT.md)
- When contributing, add yourself to [AUTHORS](AUTHORS)

## License

- [GPLv3](LICENSE)
