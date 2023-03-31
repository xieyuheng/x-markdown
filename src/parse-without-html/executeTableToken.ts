import * as Nodes from "../nodes"
import { collectUntil } from "./collectUntil"
import { Data } from "./Data"
import { TableCell } from "./TableData"
import { Token } from "./Token"

export function executeTableToken(stack: Array<Data>, token: Token): boolean {
  const who = "executeTableToken"

  if (token.type === "table_open") {
    stack.push({ kind: "Token", token })
    return true
  }

  if (token.type === "table_close") {
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
      header: tableHead.row,
      rows: tableBody.rows,
    })

    stack.push({ kind: "Node", node })
    return true
  }

  if (token.type === "thead_open") {
    stack.push({ kind: "Token", token })
    return true
  }

  if (token.type === "thead_close") {
    const [[tableRow]] = collectUntil(stack, "thead_open")
    if (tableRow.kind !== "TableRow") {
      const message = `expecting TableRow, instead of: ${tableRow.kind}`
      console.log({ who, message, row: tableRow })
      throw new Error(`[${who}] ${message}`)
    }

    stack.push({
      kind: "TableHead",
      row: tableRow.row,
      alignments: tableRow.alignments,
    })

    return true
  }

  if (token.type === "tr_open") {
    stack.push({ kind: "Token", token })
    return true
  }

  if (token.type === "tr_close") {
    const [tableCells] = collectUntil(stack, "tr_open")
    const cells = tableCells.map((data) => assertDataIsTableCell(data, who))
    const row = cells.map((cell) => cell.children)
    const alignments = cells.map((cell) => cell.alignment)
    stack.push({ kind: "TableRow", row, alignments })
    return true
  }

  return false
}

function assertDataIsTableCell(data: Data, who: string): TableCell {
  if (data.kind === "TableCell") {
    return data
  }

  const message = "expect data to be TableCell"
  console.error({ who, message, data })
  throw new Error(`[${who}] ${message}`)
}
