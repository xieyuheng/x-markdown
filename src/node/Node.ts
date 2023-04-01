import * as Nodes from "../nodes"

export type Node =
  // ContainerBlock
  | Nodes.BlockQuote
  | Nodes.List
  | Nodes.Item
  | Nodes.OrderedList
  | Nodes.OrderedItem
  // LeafBlock
  | Nodes.Paragraph
  | Nodes.Table
  | Nodes.ThematicBreak
  | Nodes.Headline
  | Nodes.CodeBlock
  | Nodes.HtmlBlock
  // Inline
  | Nodes.Code
  | Nodes.Emphasis
  | Nodes.Strong
  | Nodes.Link
  | Nodes.Image
  | Nodes.HardLineBreak
  | Nodes.SoftLineBreak
  | Nodes.Text
  | Nodes.HtmlInline
  | Nodes.FootnoteRef
