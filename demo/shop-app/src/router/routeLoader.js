const fs = require('fs')
const {resolve} = require("path")

const path = resolve(__dirname,"../page")

console.log(path);

fs.readdir(path,(err,ns)=>{
    if(err) return
    // console.log(ns);
    ns.forEach(n=>{
        // console.log(n);
        if(fs.lstatSync(resolve(path,n)).isDirectory()){
            fs.readdir(resolve(path,n),(err,n)=>{
                if(err) return
                console.log(n);
            })
        }
    })

})