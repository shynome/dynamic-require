const { mainRequire } = require('./')

/**
 * 获取模块依赖的文件
 * @param {string} id 
 * @param {string[]} added_deps 
 * @returns {string[]}
 */
exports.getModuleDeps = (id,added_deps=[])=>{

  added_deps.push(id)

  let children = /**@type {{id:string}[]}*/(mainRequire.cache[id].children).map(a=>a.id)
    .filter(f=>!/node_modules/.test(f))
    .filter(f=>!added_deps.includes(f))
  
  if( children.length ){
    children.forEach(id=>{
      exports.getModuleDeps(id,added_deps)
    })
  }

  return added_deps
  
}