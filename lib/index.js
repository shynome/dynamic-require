exports.mainRequire = require
exports.mainRequireChildrenCache = /**@type {any[]} */(exports.mainRequire.cache[__filename].children)

/**
 * @param {NodeRequire} require 
 * @returns {(module:string)=>any}
 */
exports.bind =  (require)=> /production/i.test(process.env.NODE_ENV) ? require : 
(module)=>{
  
  let id = require.resolve(module)
  let res = exports.mainRequire(id)
  
  if( exports.isChanged(id) ){

    exports.clearCache(id)
    res = exports.mainRequire(id)

  }

  return res
}

exports.getModuleDeps = require('./getModuleDeps').getModuleDeps

exports.isChanged = require('./isChanged').isChanged

exports.clearCache = require('./clearCache').clearCache
