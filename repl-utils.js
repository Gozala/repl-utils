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
var doc = require('doc')

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
  if (options.reload) delete this.require.cache[this.require.resolve(id)]

  // Loading a module.
  imports = this.require(id)
  imported = {}
  only = options.only || Object.keys(imports)
  as = options.as || {}

  only.forEach(function(name, alias) {
    alias = as[name] || name
    vm.runInContext('delete this["' + alias + '"];', this)
    imported[alias] = this[alias] = imports[name]
  }, this)

  return imported
}

exports.main = function main() {
  var context = repl.start().context
  context.use = use.bind(context)
  context.doc = doc
}

if (require.main === module) exports.main()
