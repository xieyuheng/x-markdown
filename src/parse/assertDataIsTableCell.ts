import { Data } from "./Data"
import { TableCell } from "./TableData"

export function assertDataIsTableCell(data: Data, who: string): TableCell {
  if (data.kind === "TableCell") {
    return data
  }

  const message = "expect data to be TableCell"
  console.error({ who, message, data })
  throw new Error(`[${who}] ${message}`)
}
