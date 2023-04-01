import { assertDataIsTableCell } from "../assertDataIsTableCell"
import { assertDataIsTableRow } from "../assertDataIsTableRow"
import { collectNodesUntil } from "../collectNodesUntil"
import { collectUntil } from "../collectUntil"
import { TokenHandler } from "../TokenHandler"

export const tableHandlers: Record<string, TokenHandler> = {
  table_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  table_close(ctx, token) {
    const who = "table_close"

    const tableBody = ctx.stack.pop()
    const tableHead = ctx.stack.pop()
    const openToken = ctx.stack.pop()

    if (tableBody?.kind !== "TableBody") {
      const message = `expecting TableBody, instead of: ${tableBody?.kind}`
      console.log({ who, message, tableBody })
      throw new Error(`[${who}] ${message}`)
    }

    if (tableHead?.kind !== "TableHead") {
      const message = `expecting TableHead, instead of: ${tableHead?.kind}`
      console.log({ who, message, tableHead })
      throw new Error(`[${who}] ${message}`)
    }

    ctx.stack.push({
      kind: "Node",
      node: {
        kind: "Table",
        alignments: tableHead.alignments,
        head: tableHead.row,
        body: tableBody.rows,
      },
    })
  },

  thead_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  thead_close(ctx, token) {
    const who = "thead_close"
    const [collected] = collectUntil(ctx.stack, "thead_open")
    const tableRow = assertDataIsTableRow(collected[0], who)
    ctx.stack.push({
      kind: "TableHead",
      row: tableRow.row,
      alignments: tableRow.alignments,
    })
  },

  tbody_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  tbody_close(ctx, token) {
    const who = "tbody_close"
    const [collected] = collectUntil(ctx.stack, "tbody_open")
    const tableRows = collected.map((data) => assertDataIsTableRow(data, who))
    ctx.stack.push({
      kind: "TableBody",
      rows: tableRows.map((tableRow) => tableRow.row),
    })
  },

  tr_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  tr_close(ctx, token) {
    const who = "tr_close"
    const [collected] = collectUntil(ctx.stack, "tr_open")
    const tableCells = collected.map((data) => assertDataIsTableCell(data, who))
    const row = tableCells.map((tableCell) => tableCell.children)
    const alignments = tableCells.map((tableCell) => tableCell.alignment)
    ctx.stack.push({ kind: "TableRow", row, alignments })
  },

  th_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  th_close(ctx, token) {
    const who = "th_close"
    const [children, openToken] = collectNodesUntil(ctx.stack, "th_open")
    const attrs = Object.fromEntries(openToken.attrs || [])
    const alignment = alignmentRecord[attrs.style] || null
    ctx.stack.push({ kind: "TableCell", children, alignment })
  },

  td_open(ctx, token) {
    ctx.stack.push({ kind: "Token", token })
  },

  td_close(ctx, token) {
    const who = "td_close"
    const [children, openToken] = collectNodesUntil(ctx.stack, "td_open")
    const attrs = Object.fromEntries(openToken.attrs || [])
    const alignment = alignmentRecord[attrs.style] || null
    ctx.stack.push({ kind: "TableCell", children, alignment })
  },
}

const alignmentRecord: Record<string, "left" | "right" | "center"> = {
  "text-align:left": "left",
  "text-align:right": "right",
  "text-align:center": "center",
}
