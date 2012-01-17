# repl-utils

REPL utilities. This package provides additional utilities when working with
node projects in repl. At the moment two helper function are exposed:

- `doc` prints documentation for the given function if documented as defined in
  expected format (https://github.com/Gozala/doc)
- `use` requires given module and puts all it's exports into the scope (For
  details try `doc(use)`)

# Setup

To use this repl-utilitis form your package add it to your `devDependencies` and
**optionally** add npm script `"repl": "node node_modules/repl-utils"`. Example
`package.json` file will look as follows:

```json
{
  "name": "my-package",
  "version": "0.0.1",
  "description": "my package description",
  "devDependencies": {
    "repl-utils": ">=1.0.0"
  },
  "scripts": {
    "repl": "node node_modules/repl-utils"
  }
}
```

## Usage

From your package dir run

```sh
npm run repl
```

And from the repl you'll be able to use:

```js
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
