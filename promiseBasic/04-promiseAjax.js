/**
 * 封装ajax请求发送get请求
 * 返回Promise对象
 */
function sendAjax(url) {
    const p = new Promise((resolve, reject) => {
        // const xhr =  new XMLHttpRequest()
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        }
    })
    return p
}

sendAjax('https://api.apiopen.top/getJoke').then(value => {
    console.log(value)
}, reason => {
    console.log(reason)
})
