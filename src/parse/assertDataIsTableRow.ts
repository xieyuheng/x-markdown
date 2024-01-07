import { type Data } from "./Data.js"
import { type TableRow } from "./TableData.js"

export function assertDataIsTableRow(data: Data, who: string): TableRow {
  if (data.kind === "TableRow") {
    return data
  }

  const message = "expect data to be TableRow"
  console.error({ who, message, data })
  throw new Error(`[${who}] ${message}`)
}
