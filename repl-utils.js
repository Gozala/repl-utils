/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false supernew: true */
/*global define: true */

"use strict"

doc: "Utilities for REPL"
version: "0.0.3"
author: "Irakli Gozalishivili"

var Script = require('vm').Script

// Try to override local global with a context of the repl.
try { global = module.parent.exports.repl.context } catch (e) {}

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

  var imports, imported, only, as

  options = options || {}

  // Remove module from cache if `reload` is passed.
  if (options.reload) delete global.require.cache[global.require.resolve(id)]

  // Loading a module.
  imports = global.require(id)
  imported = {}
  only = options.only || Object.keys(imports)
  as = options.as || {}

  only.forEach(function(name, alias) {
    alias = as[name] || name
    Script.runInContext('delete ' + alias + ';', global)
    imported[alias] = global[alias] = imports[name]
  })

  return imported
}
global.use = exports.use = use

global.doc = exports.doc = require('doc').doc
