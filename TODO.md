rename tokenRoutes to routes

use `runTokens` instead of `runInlineTokens`

`executeToken` take `ctx: Context`

`Context` has `footnotes: Array<Footnote>`

`document` has `footnotes`

handle `footnote_ref`

handle `footnote_block_open`
handle `footnote_block_close`

handle `footnote_open` -- with `id: number` and `label?: string`

ignore `footnote_anchor` -- this is a view layer thing

# maybe

[maybe] remove format

[maybe] use pure record type instead of class
