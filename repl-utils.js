/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false supernew: true */
/*global define: true */

"use strict"

doc: "Utilities for REPL"
version: "0.0.4"
author: "Irakli Gozalishivili"

var repl = require('repl')
var vm = require('vm')
var doc = require('doc').doc

// Define a shortcut for `Array.prototype.slice.call`.
var unbind = Function.call.bind(Function.bind, Function.call)
var slice = Array.slice || unbind(Array.prototype.slice)

exports.doc = doc

function use(id, options) {
  /**
  Like `require`, but also copies exports from the given module to the current
  context. Optionally `options` can be passed to limit imports.

  Usage:
  use('fs')
  use('fs', { only: [ 'readFile' ] })       // only imports readFile
  use('fs', { as: { writeFile: 'write' })   // imports fs.writeFile as write
  use('fs', { reload: true })               // reloads module
  use('fs', { reload: true, all: true })    // reloads all modules
  **/

  var imports, imported, only, as
  options = options || {}

  // Remove module from cache if `reload` is passed.
  if (options.reload) {
    if (options.all) global.require.cache = {}
    else delete global.require.cache[global.require.resolve(id)]
  }

  // Loading a module.
  imports = global.require(id)

  // If module only exports function just return it.
  if (typeof(imports) === "function") return imports

  imported = {}
  only = options.only || Object.keys(imports)
  as = options.as || {}

  only.forEach(function onEach(name, alias) {
    alias = as[name] || name
    vm.runInThisContext('delete this["' + alias + '"];')
    imported[alias] = global[alias] = imports[name]
  })

  return imported
}
exports.use = use

exports.main = function main() {
  var context = repl.start({
    useGlobal: true,
    ignoreUndefined: false
  }).context
  context.use = use
  context.doc = doc
}

if (require.main === module) exports.main()
