/**
 * 自定义promise
 */
import Promise from "./promise.js";
import promise from "./promise.js";

let p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('ok')
        // reject('error')
    },3000)
    // 异步任务
    // throw 'error'
    // resolve('ok')
})
// let res = p.then(value => {
//     // return new Promise((resolve, reject) => {
//     //     resolve('success')
//     //     // reject('error')
//     //
//     // })
//     return 'okkk'
// }, reason => {
//     // console.warn(reason)
//     // throw 'error'
//     return new Promise((resolve,reject) => {
//         reject('123')
//     })
// })

// let res = p.catch(reason => {
//     // console.log(reason)
//     return new Promise((resolve,reject)=>{
//         reject('123')
//     })
// })

//值传递
// p.then().then(value => {
//     console.log('222')
// }).then(value=> {
//     console.log('333')
// }).catch(reason =>{
//     console.warn('666')
// })
// console.log(res)

// let res = Promise.resolve(new Promise((resolve,reject) => {
//     // reject('error')
//     resolve('123')
// }))

// let res = Promise.reject('132')

// let p1 = new Promise((resolve,reject) => {
//     // reject('111')
//     throw 'error'
// })
// let p2 = new Promise((resolve,reject) => {
//     resolve('222')
// })
// let p3 = new Promise((resolve,reject) => {
//     reject('333')
// })
// let res = Promise.race([p1,p2,p3])
// console.log(res)

let p1 = new Promise((resolve,reject)=> {
    reject('ok')
    console.log(11)
})
// p1.then(value => {
//     console.log(22)
// },reason => {
//     console.log(444)
// })
let res = p1.then(value => {
    console.log(11)
},reason =>{
    console.log(22)
})
console.log(res)
// 输出的结果为 11 33  22  因为then方法的回调函数为异步的 得等同步函数执行完毕再执行
