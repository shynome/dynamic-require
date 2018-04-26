const { mainRequire, getModuleDeps } = require('./index')
const crypto = require('crypto')
const fs = require('fs')

/**
 * 获取文件 hash 值
 * @param {string} f 
 */
exports.getFileHash = f=>crypto.createHash('md5').update(fs.readFileSync(f)).digest('base64')

/**
 * @param {string} id 
 */
exports.isChanged = (id)=>{
  let new_deps = getModuleDeps(id)
  let new_hash = new_deps.map(exports.getFileHash).join(',')
  let old_hash = mainRequire.cache[id].hash
  if(typeof old_hash === 'undefined' ){
    mainRequire.cache[id].hash = new_hash
    mainRequire.cache[id].deps = new_deps
    return false
  }
  if( old_hash === new_hash){
    return false
  }
  mainRequire.cache[id].hash = new_hash
  mainRequire.cache[id].deps = new_deps
  return true
}
