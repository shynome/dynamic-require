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
        assert.deepStrictEqual(
          i,
          a,
          `${JSON.stringify([a,i])}`
        )
      })
    }
  })

  it('test chain require',async ()=>{
    
    const file = ['./d.js','./e.js','./f.js']
    const filepath = file.map(f=>path.join(__dirname,f))
    const filectx = [
      `module.exports=require('${file[1]}')`,
      `module.exports=require('${file[2]}')`,
    ]

    // before
    filepath.slice(0,-1).forEach((f,i)=>fs.writeFileSync(f,filectx[i]))
    
    for(let i=4;i--;i>0){

      fs.writeFileSync(filepath[2],`module.exports=${i}`)
      
      let r = dynamicRequire(filepath[0])
      
      assert.deepStrictEqual(
        i, 
        r, 
        `${JSON.stringify([i,r])}` 
      )

    }

    // after
    filepath.forEach(f=>fs.unlinkSync(f))
    
  })

})