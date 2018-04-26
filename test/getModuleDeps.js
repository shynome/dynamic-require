const { getModuleDeps } = require('../lib/getModuleDeps')
const file = ['./a.js','./b.js']
const path = require('path')
const filepath = file.map(f=>path.join(__dirname,f))
const filectx = [
`exports.b=require('./b')`,
`module.exports=require('./a')`,
] 
const fs = require('fs')
const assert = require('assert')

describe('getModuleDeps',()=>{

  before(()=>{
    filepath.forEach((f,index)=>{
      fs.writeFileSync(f,filectx[index])
    })
  })
  
  it('loop require',()=>{
    require(file[0])
    let modules = getModuleDeps(require.resolve(file[0]))
    assert(
      modules.length === 2,
      `module is ${JSON.stringify(modules)}`
    )
  })

  after(()=>{
    filepath.forEach(f=>{
      fs.unlinkSync(f)
    })
  })

})

