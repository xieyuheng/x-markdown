import { type TokenHandler } from "../TokenHandler.js"
import { assertNodeIsItem } from "../assertNodeIsItem.js"
import { assertNodeIsOrderedItem } from "../assertNodeIsOrderedItem.js"
import { collectNodesUntil } from "../collectNodesUntil.js"

export const containerBlockHandlers: Record<string, TokenHandler> = {
  blockquote_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  blockquote_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "blockquote_open")
    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "BlockQuote",
        children,
      },
    })
  },

  bullet_list_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  bullet_list_close(ctx, token) {
    const [children] = collectNodesUntil(ctx.stack, "bullet_list_open")
    const items = children.map((child) =>
      assertNodeIsItem(child, "bullet_list_close"),
    )

    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "List",
        children: items,
      },
    })
  },

  list_item_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  list_item_close(ctx, token) {
    const [children, openToken] = collectNodesUntil(ctx.stack, "list_item_open")
    if (openToken.info.length > 0) {
      ctx.stack.push({
        kind: "Node",
        node: {
          kind: "OrderedItem",
          number: Number(openToken.info),
          delimiter: openToken.markup,
          children,
        },
      })
    } else {
      ctx.stack.push({
        kind: "Node",
        node: {
          kind: "Item",
          children,
        },
      })
    }
  },

  ordered_list_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  ordered_list_close(ctx, token) {
    const [children, openToken] = collectNodesUntil(
      ctx.stack,
      "ordered_list_open",
    )
    const attrs = Object.fromEntries(openToken.attrs || [])
    const orderedItems = children.map((child) =>
      assertNodeIsOrderedItem(child, "ordered_list_close"),
    )

    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "OrderedList",
        start: Number(attrs.start),
        delimiter: openToken.markup,
        children: orderedItems,
      },
    })
  },
}
