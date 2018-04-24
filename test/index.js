
const path = require('path')
const assert = require('assert')
const fs = require('fs')
const dynamicRequireFilename = './.dynamicRequire.js'
const dynamicRequireFilepath = path.join(__dirname,dynamicRequireFilename)

describe('main',()=>{

  let dynamicRequire = require('../')(require)


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
  
  after(()=>{
    fs.unlinkSync(dynamicRequireFilepath)
  })
  
})