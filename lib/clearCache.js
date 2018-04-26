const { mainRequire, mainRequireChildrenCache } = require('./index')
const { hashStore } = require('./isChanged')

/**
 * clear require cache
 * @param {string} id 
 */
exports.clearCache = (id)=>{
  /**@type {any[]}*/(hashStore[id].deps).forEach(id=>{
    mainRequireChildrenCache.splice(mainRequireChildrenCache.indexOf(mainRequire.cache[id]),1)
    delete mainRequire.cache[id]
  })
}