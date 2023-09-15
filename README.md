# X Markdown

A stable Markdown AST to protect myself from switching upstream parser and upstream API changes.

## Install

```bash
npm i @xieyuheng/x-markdown
```

## The AST

### Overview

`Document`

`Nodes`

- `ContainerBlock`

  - `BlockQuote`
  - `List`
  - `Item`
  - `OrderedList`
  - `OrderedItem`

- `LeafBlock`

  - `Paragraph`
  - `Table`
  - `ThematicBreak`
  - `Headline`
  - `CodeBlock`
  - `HtmlBlock`

- `Inline`

  - `Code`
  - `Emphasis`
  - `Strong`
  - `Link`
  - `Image`
  - `HardLineBreak`
  - `SoftLineBreak`
  - `Text`
  - `HtmlInline`
  - `FootnoteRef`

### One By One

TODO

### References

- [Commonmark](https://spec.commonmark.org/current).

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
