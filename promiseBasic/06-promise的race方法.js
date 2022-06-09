/**
 * promise的race内置api
 */
let p1 = new Promise((resolve, reject)=>{
    resolve('P1')
})
// 谁先改变状态就依照谁的为准
let p2 = Promise.resolve()
let p2 = Promise.reject()

let race = Promise.race([p1,p2,p3]);
