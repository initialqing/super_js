// async function main() {
//     // 返回的数据类型不是promise对象则为成功promise对象
//     // return 521
//     return new Promise(((resolve, reject) => {
//         // reject('ok')
//         throw 'oh no'
//     }))
// }
//
// let res = main()
// res.catch(reason => {
//     console.log(111)
// })
// // res.then(value => {
// //     console.log(111)
// // },reason=>{
// //     console.log(222)
// // })
// console.log()


//await 表达式
async function sum() {
    let p = new Promise(((resolve, reject) => {
        // resolve('ok')
        reject('123')
    }))
    // let res = await p
    // let res = await 20
    // console.log(res)
    try {
        let res = await p
    } catch (e) {
        console.log(e)
    }
}

sum()

