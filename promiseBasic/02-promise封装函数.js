// 传入文档路径返回读取到的文档的值
function readMyFile(path) {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.readFile(path,(err,data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
readMyFile('./1.txt').then(value => {
    console.log(value.toString())
},reason => {
    console.log(reason)
})
