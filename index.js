const mainRequire = exports.mainRequire = require
const mainRequireChildrenCache = /**@type {any[]} */(mainRequire.cache[__filename].children)

/**
 * @param {NodeRequire} require 
 * @returns {(module:string)=>any}
 */
exports.bind =  (require)=> /production/i.test(process.env.NODE_ENV) ? require : 
(module)=>{
  
  let id = require.resolve(module)
  let res = mainRequire(id)
  
  if( exports.isChanged(id) ){

    exports.clearCache(id)
    res = mainRequire(id)

  }

  return res
}

/**
 * 获取模块依赖的文件
 * @param {string} id 
 * @param {string[]} added_deps 
 * @returns {string[]}
 */
exports.getModuleDeps = (id,added_deps=[])=>{
  let deps = [id]
  added_deps.push(...deps)
  let children = /**@type {{id:string}[]}*/(mainRequire.cache[id].children).map(a=>a.id)
  if( children.length ){
    
  }else{
    
  }
  return []
}

exports.isChanged = require('./isChanged').isChanged

/**
 * clear require cache
 * @param {string} id 
 */
exports.clearCache = (id)=>{
  /**@type {any[]}*/(mainRequire.cache[id].deps).forEach(id=>{
    mainRequireChildrenCache.splice(mainRequireChildrenCache.indexOf(mainRequire.cache[id]),1)
    delete mainRequire.cache[id]
  })
}