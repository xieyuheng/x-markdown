import MarkdownIt from "markdown-it"
const md = new MarkdownIt({ html: true })

md.use(require("markdown-it-footnote"))

const text = `\
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.
`

const result = md.parse(text, {})

console.dir(result, { depth: null })
