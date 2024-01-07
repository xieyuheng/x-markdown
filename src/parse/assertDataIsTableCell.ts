import { type Data } from "./Data.js"
import { type TableCell } from "./TableData.js"

export function assertDataIsTableCell(data: Data, who: string): TableCell {
  if (data.kind === "TableCell") {
    return data
  }

  const message = "expect data to be TableCell"
  console.error({ who, message, data })
  throw new Error(`[${who}] ${message}`)
}
