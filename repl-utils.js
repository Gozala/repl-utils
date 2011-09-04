/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false supernew: true */
/*global define: true */

"use strict"

doc: "Utilities for REPL"
version: "0.0.1"
author: "Irakli Gozalishivili"

try { exports = module.parent.exports.repl.context } catch (e) {}

function use(id, options) {
  /**
  Like `require`, but also copies exports from the given module to the current
  context. Optionally `options` can be passed to limit imports.

  Usage:
  use('fs')
  use('fs', { only: [ 'readFile' ] })     // only imports readFile
  use('fs', { as: { writeFile: write })   // imports fs.writeFile as write
  use('fs', { reload: true })             // reloads module
  **/

  var imports, only, as

  options = options || {}

  // Remove module from cache if `reload` is passed.
  if (options.reload) delete require.cache[require.resolve(id)]

  // Loading a module.
  imports = require(id)
  only = options.only || Object.keys(imports)
  as = options.as || {}

  only.forEach(function(name) { context[as[name] || name] = imports[name] })
}
exports.use = use

exports.doc = require('doc').doc
