const { mainRequire, mainRequireChildrenCache } = require('./index')

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