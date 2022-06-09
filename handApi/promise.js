class Promise {
    constructor(executor) {
        this.promiseState = 'pending'
        this.promiseResult = null
        // 属性回调函数
        this.callbacks = []
        const self = this

        //promiseState
        //promiseResult
        function resolve(data) {
            // 这里this指向的是window
            if (self.promiseState !== 'pending') return
            self.promiseState = 'fulfilled'
            self.promiseResult = data
            // 成功之后调用回调
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onResolved(data)
                })

            })
        }

        function reject(data) {
            // 状态只能修改一次
            if (self.promiseState !== 'pending') return
            self.promiseState = 'rejected'
            self.promiseResult = data
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(data)
                })
            })
        }

        // 执行器函数再内部是同步调用的
        try {
            // 抛出异常改变promise状态
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onResolved, onRejected) {
        let self = this
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }
        }
        if (typeof onResolved !== 'function') {
            onResolved = value => value
        }
        return new Promise((resolve, reject) => {
            // 封装函数
            function callback(type) {
                try {
                    let res = type(self.promiseResult)
                    if (res instanceof Promise) {
                        // 如果是promise类型的对象
                        res.then(v => {
                            resolve(v)
                        }, r => {
                            reject(r)
                        })
                    } else {
                        resolve(res)
                    }
                } catch (e) {
                    reject(e)
                }
            }

            // 根据状态来判断进行执行
            if (this.promiseState === 'fulfilled') {
                // 让函数的执行变为异步执行的
                setTimeout(() => {
                    callback(onResolved)
                })
            }
            if (this.promiseState === 'rejected') {
                setTimeout(() => {
                    callback(onRejected)
                })
            }
            // 缺少对pending状态的判断
            if (this.promiseState === 'pending') {
                // 保存回调函数
                this.callbacks.push({
                    onRejected: function () {
                        callback(onRejected)
                    },
                    onResolved: function () {
                        callback(onResolved)
                    }
                })

            }
            // then方法返回结果的实现，返回指定函数的执行结果来决定的
        })

    }

    catch (onRejected) {
        return this.then(undefined, onRejected)
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    static all(arr) {
        return new Promise((resolve, reject) => {
            let count = 0
            // 保存成功的结果
            let res = []
            for (let i = 0; i < arr.length; i++) {
                arr[i].then(v => {
                    // resolve()
                    // 每个promise对象都成功才调用
                    count++
                    res[i] = v
                    if (count === arr.length) {
                        resolve(res)
                    }
                }, r => {
                    reject(r)
                })
            }
        })
    }

    static race(pArr) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < pArr.length; i++) {
                pArr[i].then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            }
        })
    }
}

// function Promise(executor) {
//     this.promiseState = 'pending'
//     this.promiseResult = null
//     // 属性回调函数
//     this.callbacks = []
//     const self = this
//
//     //promiseState
//     //promiseResult
//     function resolve(data) {
//         // 这里this指向的是window
//         if (self.promiseState !== 'pending') return
//         self.promiseState = 'fulfilled'
//         self.promiseResult = data
//         // 成功之后调用回调
//         setTimeout(() => {
//             self.callbacks.forEach(item => {
//                 item.onResolved(data)
//             })
//
//         })
//     }
//
//     function reject(data) {
//         // 状态只能修改一次
//         if (self.promiseState !== 'pending') return
//         self.promiseState = 'rejected'
//         self.promiseResult = data
//         setTimeout(()=>{
//             self.callbacks.forEach(item => {
//                 item.onRejected(data)
//             })
//         })
//     }
//
//     // 执行器函数再内部是同步调用的
//     try {
//         // 抛出异常改变promise状态
//         executor(resolve, reject)
//     } catch (e) {
//         reject(e)
//     }
// }

/**
 * 传入的两个参数都为函数
 * @param onResolved
 * @param onRejected
 */
// Promise.prototype.then = function (onResolved, onRejected) {
//     let self = this
//     if (typeof onRejected !== 'function') {
//         onRejected = reason => {
//             throw reason
//         }
//     }
//     if (typeof onResolved !== 'function') {
//         onResolved = value => value
//     }
//     return new Promise((resolve, reject) => {
//         // 封装函数
//         function callback(type) {
//             try {
//                 let res = type(self.promiseResult)
//                 if (res instanceof Promise) {
//                     // 如果是promise类型的对象
//                     res.then(v => {
//                         resolve(v)
//                     }, r => {
//                         reject(r)
//                     })
//                 } else {
//                     resolve(res)
//                 }
//             } catch (e) {
//                 reject(e)
//             }
//         }
//
//         // 根据状态来判断进行执行
//         if (this.promiseState === 'fulfilled') {
//             // 让函数的执行变为异步执行的
//             setTimeout(() => {
//                 callback(onResolved)
//             })
//         }
//         if (this.promiseState === 'rejected') {
//             setTimeout(() => {
//                 callback(onRejected)
//             })
//         }
//         // 缺少对pending状态的判断
//         if (this.promiseState === 'pending') {
//             // 保存回调函数
//             this.callbacks.push({
//                 onRejected: function () {
//                     callback(onRejected)
//                 },
//                 onResolved: function () {
//                     callback(onResolved)
//                 }
//             })
//
//         }
//         // then方法返回结果的实现，返回指定函数的执行结果来决定的
//     })
//
// }
// Promise.prototype.catch = function (onRejected) {
//     return this.then(undefined, onRejected)
// }
// Promise.resolve = function (value) {
//     return new Promise((resolve, reject) => {
//         if (value instanceof Promise) {
//             value.then(v => {
//                 resolve(v)
//             }, r => {
//                 reject(r)
//             })
//         } else {
//             resolve(value)
//         }
//     })
// }
// Promise.reject = function (reason) {
//     return new Promise((resolve, reject) => {
//         reject(reason)
//     })
// }
// Promise.all = function (arr) {
//     return new Promise((resolve, reject) => {
//         let count = 0
//         // 保存成功的结果
//         let res = []
//         for (let i = 0; i < arr.length; i++) {
//             arr[i].then(v => {
//                 // resolve()
//                 // 每个promise对象都成功才调用
//                 count++
//                 res[i] = v
//                 if (count === arr.length) {
//                     resolve(res)
//                 }
//             }, r => {
//                 reject(r)
//             })
//         }
//     })
// }
// Promise.race = function (pArr) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < pArr.length; i++) {
//             pArr[i].then(v => {
//                 resolve(v)
//             }, r => {
//                 reject(r)
//             })
//         }
//     })
// }
export default Promise