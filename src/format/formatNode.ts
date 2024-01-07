import { type Node } from "../node/index.js"
import { type Alignment } from "../nodes/index.js"

export function formatNode(node: Node): string {
  switch (node.kind) {
    case "BlockQuote": {
      // NOTE We use "\n\n" instead of "\n" here.
      const text = node.children.map(formatNode).join("\n\n")
      const lines = text.split("\n")

      const prefix = "> "

      return lines.map((line) => prefix + line).join("\n")
    }

    case "List": {
      return node.children.map(formatNode).join("\n\n")
    }

    case "Item": {
      const text = node.children.map(formatNode).join("\n")
      const lines = text.split("\n")

      const prefix = "- "
      const head = prefix + lines[0]
      const tail = lines
        .splice(1)
        .map((line) => " ".repeat(prefix.length) + line)

      return [head, ...tail].join("\n")
    }

    case "OrderedList": {
      return node.children.map(formatNode).join("\n\n")
    }

    case "OrderedItem": {
      const text = node.children.map(formatNode).join("\n")
      const lines = text.split("\n")

      const prefix = node.number + node.delimiter + " "
      const head = prefix + lines[0]
      const tail = lines
        .splice(1)
        .map((line) => " ".repeat(prefix.length) + line)

      return [head, ...tail].join("\n")
    }

    case "Paragraph": {
      return node.children.map(formatNode).join("")
    }

    case "Table": {
      const head = formatRow(node.head)

      const alignments =
        "|" + node.alignments.map(formatAlignment).join("|") + "|"

      const body = node.body.map(formatRow)

      return [head, alignments, ...body].join("\n")

      function formatAlignment(alignment: Alignment): string {
        switch (alignment) {
          case "left":
            return ":--"
          case "right":
            return "--:"
          case "center":
            return ":-:"
          default:
            return "---"
        }
      }

      function formatRow(row: Array<Array<Node>>): string {
        return (
          "|" +
          row.map((nodes) => nodes.map(formatNode).join("")).join(" | ") +
          "|"
        )
      }
    }

    case "ThematicBreak": {
      return "------"
    }

    case "Headline": {
      const head = "#".repeat(node.level)
      const body = node.children.map(formatNode).join("")
      return `${head} ${body}`
    }

    case "CodeBlock": {
      return ["``` " + node.info, node.text.trim(), "```"].join("\n")
    }

    case "HtmlBlock": {
      return node.text.trim()
    }

    case "Code": {
      return "`" + node.text + "`"
    }

    case "Emphasis": {
      return "*" + node.children.map(formatNode).join("") + "*"
    }

    case "Strong": {
      return "**" + node.children.map(formatNode).join("") + "**"
    }

    case "Link": {
      const text = node.children.map(formatNode).join("")
      if (node.title) {
        return `[${text}](${node.href} "${node.title}")`
      } else {
        return `[${text}](${node.href})`
      }
    }

    case "Image": {
      const text = node.children.map(formatNode).join("")
      if (node.alt) {
        return `![${text}](${node.src} "${node.alt}")`
      } else {
        return `![${text}](${node.src})`
      }
    }

    case "HardLineBreak": {
      return "\\\n"
    }

    case "SoftLineBreak": {
      return "\n"
    }

    case "Text": {
      return node.text
    }

    case "HtmlInline": {
      return node.text
    }

    case "FootnoteRef": {
      return `[^${node.name || "#" + node.id}]`
    }
  }
}
