import { createParser } from "../../parser"
import * as ut from "../../utils"

{
  // NOTE The info line will be trimed
  const text = ut.formatCodeBlock("    sisuo    ", "console.log('Hello')")
  const document = createParser().parseDocument(text)

  document.assertChildrenJson([
    {
      kind: "CodeBlock",
      info: "sisuo",
      text: "console.log('Hello')\n",
    },
  ])
}
