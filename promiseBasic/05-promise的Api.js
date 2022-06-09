/**
 * resolve方法
 * @type {Promise<number>}
 */
let p1 = Promise.resolve(521)
// console.log(p1)
let p2 = Promise.resolve(new Promise((resolve, reject)=>{
    reject('Error')
}))
p2.catch(reason => {
    // console.log('error')
})
console.log(p2)
/**
 * reject内置api
 * @type {Promise<never>}
 */
//不论传入什么返回的promise都会是失败的状态
let p3 = Promise.reject(123);
p3.catch(reason => {
    // console.log('error')
})
/**
 * promise的all方法
 * 传入参数为promise的数组，返回的promise对象状态由传入的promise对象的状态决定。成功结果为成功promise 的数组
 */
let p11 = new Promise((resolve,reject)=>{
    resolve('P1')
})
let p22 = Promise.resolve('p2')
let p33 = Promise.reject('p3')
p33.catch(reason => {
    console.log('error')
})
const all = Promise.all([p11,p22,p33]);
all.catch(reason => {
    console.log('all')
})

