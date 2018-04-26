const { mainRequire, getModuleDeps } = require('./index')
const crypto = require('crypto')
const fs = require('fs')

/**
 * 获取文件 hash 值
 * @param {string} f 
 */
exports.getFileHash = f=>crypto.createHash('md5').update(fs.readFileSync(f)).digest('base64')

exports.hashStore = {}

/**
 * @param {string} id 
 */
exports.isChanged = (id)=>{
  let new_deps = getModuleDeps(id)
  let new_hash = new_deps.map(exports.getFileHash).join(',')
  exports.hashStore[id] = exports.hashStore[id] || {}
  let old_hash = exports.hashStore[id].hash
  if(typeof old_hash === 'undefined' ){
    exports.hashStore[id].hash = new_hash
    exports.hashStore[id].deps = new_deps
    return false
  }
  if( old_hash === new_hash){
    return false
  }
  exports.hashStore[id].hash = new_hash
  exports.hashStore[id].deps = new_deps
  return true
}
