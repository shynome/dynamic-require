const { bind } = require('../')
const dynamicRequire = bind(require)
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const dynamicRequireFilename = './single_file.js'
const dynamicRequireFilepath = path.join(__dirname,dynamicRequireFilename)

describe('dynamicRequire',()=>{

  it('test single file',()=>{
    for(let i=4;i--;i>0){
      it(`test ${i}`,async()=>{
        fs.writeFileSync(dynamicRequireFilepath,`module.exports=${i}`)
        let a = dynamicRequire(dynamicRequireFilename)
        assert(
          a === i,
          `test failed. ${[a,i].join(',')}`
        )
      })
    }
  })

  it('test chain require',()=>{
    
    const file = ['./a.js','./b.js','./c.js']
    const filepath = file.map(f=>path.join(__dirname,f))
    const filectx = [
      `module.exports=require('${file[1]}')`,
      `module.exports=require('${file[2]}')`,
      `module.exports=require('${file[3]}')`,
    ]

    console.log('b')
    
  })

})