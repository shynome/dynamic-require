const mainRequire = require
const mainRequireChildrenCache = /**@type {any[]} */(mainRequire.cache[__filename].children)
const fs = require('fs')
const crypto = require('crypto')
/**
 * @param {NodeRequire} require 
 * @returns {(module:string)=>any}
 */
module.exports =  (require)=> /production/i.test(process.env.NODE_ENV) ? require : 
(module)=>{
  
  let id = require.resolve(module)
  let res = mainRequire(id)
  
  let now_hash = crypto.createHash('md5').update(fs.readFileSync(id)).digest('base64')
  let last_hash = mainRequire.cache[id].last_hash

  // frist load set ctimeMs
  if(typeof last_hash === 'undefined'){
    mainRequire.cache[id].last_hash = now_hash
    return res
  }

  // reload module
  if( now_hash !== last_hash){

    mainRequireChildrenCache.splice( mainRequireChildrenCache.indexOf(mainRequire.cache[id]), 1 )
    delete mainRequire.cache[id]
    
    res = mainRequire(id)
    mainRequire.cache[id].last_hash = now_hash

  }

  return res
}