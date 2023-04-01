import { Data } from "./Data"
import { FootnoteData } from "./FootnoteData"

export function assertDataIsFootnoteData(
  data: Data,
  who: string,
): FootnoteData {
  if (data.kind === "FootnoteData") {
    return data
  }

  const message = "expect data to be FootnoteData"
  console.error({ who, message, data })
  throw new Error(`[${who}] ${message}`)
}
