const path = require('path')
const assert = require('assert')
const fs = require('fs')
const file_arr = ['./a.js','./b.js','./c.js']
const filectx_arr = [
`module.exports=require('./b').c`,
`
exports.c=require('./c')
exports.b='b'
`,
`module.exports=5`,
`module.exports=6`,
]
const filepath_arr = file_arr.map(f=>path.join(__dirname,f))
const dynamicRequire = require('../').bind(require)

describe('chain-file-require',()=>{

  before(()=>{
    filepath_arr.forEach((f,index)=>{
      fs.writeFileSync(f,filectx_arr[index])
    })
  })

  it('getModuleDeps',async()=>{
    let id = filepath_arr[0]
    debugger
    require('../').mainRequire(id)
    let deps = require('../').getChildrenModuleDeps(id)
    console.log(deps)
  })

  it('test 1',()=>{
    let a = dynamicRequire(file_arr[0])
    assert(
      a === 5,
      `test failed. ${ JSON.stringify([a,5]) }`,
    )
  })

  it('test 2',()=>{
    fs.writeFileSync(filepath_arr[2],filectx_arr[3])
    let a = dynamicRequire(file_arr[0])

    assert(
      a === 6,
      `test failed. ${ JSON.stringify([a,6]) }`,
    )
  })
  
  after(()=>{
    filepath_arr.forEach((f)=>{
      fs.unlinkSync(f)
    })
  })
})