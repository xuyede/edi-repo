/**
 *  函数promise化, 函数需遵循 ErrorFirst定义
 */

// const funcAsync = promisify(func)
// funcAsync().then().catch()

export function promisify (func) {
  return function (...arg) {
      return new Promise( (res, rej) => {
          func(...arg, (err, data) => {
              if (err) rej(err)
              res(data)
          })
      })
  }
}

/**
 * promise化函数对象，在原有的基础上添加Async后缀的函数
 * @param {*} obj 
 */
export function promisifyAll (obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'function') {
        obj[`${key}Async`] = this.promisify(obj[key])
    }
  }
}
