// organize-imports-ignore

export * from "./Document"

// NOTE https://spec.commonmark.org/current

// NOTE The class hierarchy:
// - ContainerBlock < Block < Node
//   - BlockQuote
//   - List > OrderedList
//   - Item > OrderedItem
// - LeafBlock < Block < Node
//   - Paragraph
//   - Table
//   - Thematic-break
//   - Headline
//   - CodeBlock
//   - HtmlBlock
// - Inline < Node
//   - Code
//   - Emphasis
//   - Strong
//   - Link
//   - LineBreak > HardLineBreak, SoftLineBreak
//   - Text
//   - FootnoteRef

export * from "./Block"
export * from "./ContainerBlock"
export * from "./LeafBlock"
export * from "./Inline"

export * from "./container-blocks/BlockQuote"
export * from "./container-blocks/List"
export * from "./container-blocks/Item"
export * from "./container-blocks/OrderedList"
export * from "./container-blocks/OrderedItem"

export * from "./leaf-blocks/Paragraph"
export * from "./leaf-blocks/Table"
export * from "./leaf-blocks/Headline"
export * from "./leaf-blocks/ThematicBreak"
export * from "./leaf-blocks/HtmlBlock"
export * from "./leaf-blocks/CodeBlock"

export * from "./inlines/Emphasis"
export * from "./inlines/Strong"
export * from "./inlines/LineBreak"
export * from "./inlines/HardLineBreak"
export * from "./inlines/SoftLineBreak"
export * from "./inlines/Link"
export * from "./inlines/Image"
export * from "./inlines/Code"
export * from "./inlines/HtmlInline"
export * from "./inlines/Text"
