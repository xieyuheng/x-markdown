import * as Nodes from "../nodes"
import { assertDataIsTableCell } from "./assertDataIsTableCell"
import { assertDataIsTableRow } from "./assertDataIsTableRow"
import { collectNodesUntil } from "./collectNodesUntil"
import { collectUntil } from "./collectUntil"
import { TokenHandler } from "./TokenHandler"

export const tableTokenRoutes: Record<string, TokenHandler> = {
  table_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  table_close(stack, token) {
    const who = "table_close"

    const tableBody = stack.pop()
    const tableHead = stack.pop()
    const openToken = stack.pop()

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

    const node = new Nodes.Table({
      alignments: tableHead.alignments,
      head: tableHead.row,
      body: tableBody.rows,
    })

    stack.push({ kind: "Node", node })
  },

  thead_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  thead_close(stack, token) {
    const who = "thead_close"
    const [collected] = collectUntil(stack, "thead_open")
    const tableRow = assertDataIsTableRow(collected[0], who)
    stack.push({
      kind: "TableHead",
      row: tableRow.row,
      alignments: tableRow.alignments,
    })
  },

  tbody_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  tbody_close(stack, token) {
    const who = "tbody_close"
    const [collected] = collectUntil(stack, "tbody_open")
    const tableRows = collected.map((data) => assertDataIsTableRow(data, who))
    stack.push({
      kind: "TableBody",
      rows: tableRows.map((tableRow) => tableRow.row),
    })
  },

  tr_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  tr_close(stack, token) {
    const who = "tr_close"
    const [collected] = collectUntil(stack, "tr_open")
    const tableCells = collected.map((data) => assertDataIsTableCell(data, who))
    const row = tableCells.map((tableCell) => tableCell.children)
    const alignments = tableCells.map((tableCell) => tableCell.alignment)
    stack.push({ kind: "TableRow", row, alignments })
  },

  th_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  th_close(stack, token) {
    const who = "th_close"
    const [children, openToken] = collectNodesUntil(stack, "th_open")
    const attrs = Object.fromEntries(openToken.attrs || [])
    const alignment = alignmentRecord[attrs.style] || null
    stack.push({ kind: "TableCell", children, alignment })
  },

  td_open(stack, token) {
    stack.push({ kind: "Token", token })
  },

  td_close(stack, token) {
    const who = "td_close"
    const [children, openToken] = collectNodesUntil(stack, "td_open")
    const attrs = Object.fromEntries(openToken.attrs || [])
    const alignment = alignmentRecord[attrs.style] || null
    stack.push({ kind: "TableCell", children, alignment })
  },
}

const alignmentRecord: Record<string, "left" | "right" | "center"> = {
  "text-align:left": "left",
  "text-align:right": "right",
  "text-align:center": "center",
}
