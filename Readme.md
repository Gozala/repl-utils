# repl-utils #

REPL utilities. This package provides additional utilities for working with node
REPL:

- `doc` prints documentation for the given function if documented as defined in
  expected format (https://github.com/Gozala/doc)
- `use` requires given module and puts all it's exports into the scope (For
  details try `doc(use)`)

## Install ##

    npm install repl-utils

## Usage ##

```js
require('repl-utils') // Now you're ready to go!

doc(doc) // try this:

/*
function doc(source) { ... }
-----------------------------------------------
Prints documentanion of the given function
*/


doc(use) // Now this:

/*
function use(id, options) { ... }
-----------------------------------------------
Like `require`, but also copies exports from the given module to the current
context. Optionally `options` can be passed to limit imports.

Usage:
use('fs')
use('fs', { only: [ 'readFile' ] })     // only imports readFile
use('fs', { as: { writeFile: write })   // imports fs.writeFile as write
use('fs', { reload: true })             // reloads module
*/

// Enjoy hacking!
```
