/**
 * util的promisify方法
 */
// 引入util模块
const util = require('util')
// 引入fs模块
const fs = require('fs')
// 返回新的函数
let myReadFile = util.promisify(fs.readFile);
myReadFile('./1.txt').then(value => {
    console.log(value.toString())
})
