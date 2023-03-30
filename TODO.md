remove `app/`
remove `tagged-item/`
remove `plugins/`
remove `node-visitor/`
rename `ut/` to `utils/`
rename unused `utils/`

review upstream parsers

be sure about parsing of html element

use simple type instead of class

# old todo

## plugins

- be able to custom `render` function, to generate enriched html

## refactor

- [refactor] `NodeMapper` as a special `NodeVisitor`

  - to avoid implement `default` in client code

## error report

- [error report] `plugins/` be able to custom error report in plugin interface
