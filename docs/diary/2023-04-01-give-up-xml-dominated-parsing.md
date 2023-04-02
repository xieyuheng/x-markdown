---
title: Give up XML dominated parsing
date: 2023-04-01
---

# The problem

`HtmlBlock` and `HtmlInline` are part of Markdown AST,
but because of newline is used to denote new paragraph,
Markdown parsers (specially the commonmark spec)
do not handle the following XML:

```html
<x-card> Hello </x-card>
```

They can only handle:

```html
<x-card> Hello </x-card>
```

# First solution

I tried to use "XML dominated parsing", meaning:

- parse code block (or inline code) first,
- then reparse other text as XML,
- for the XML nodes, elements are preserved,
- and texts are reparsed again to markdown AST.

We can NOT really use this why of parsing.

Because the XML parser will be too strict,
a lot of valid markdown text such as `1 < 2` and `Q & A` will cause errors.

Using HTML parser for the XML nodes is also NOT an option.

Because HTML parser (such as `DOMParser`) changes user's code,
and does not support unicode tag name (for example, Chinese).

Even if we tradeoff unicode support,
the following behavior can not be accepted for XML usage.

```js
new DOMParser().parseFromString("a <x /> b", "text/html")
```

Will give

```html
a <x> b</x>
```

# We still have hope

We can try use the `HtmlBlock` and `HtmlInline` in the AST,
to build `HtmlElement`.

- Maybe the use of `readback` (like reparse) should be reviewed too.
