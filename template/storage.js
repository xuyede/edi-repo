/**
 * storage操作相关
 */

const setSessionStorage = (key, value) => {
  const storage = window.sessionStorage
  try {
    if (typeof value === 'string') {
      storage.setItem(key, value)
    } else {
      storage.setItem(key, JSON.stringify(value))
    }
  } catch (e) {}
}

const getSessionStorage = (key) => {
  const storage = window.sessionStorage
  const item = storage.getItem(key)
  let value
  // 数组，对象序列化处理
  if (/^\[|{[\w\W]*}|\]$/g.test(item)) {
    value = JSON.parse(item)
  } else {
    value = item
  }

  return value
}

const removeSessionStorage = (key) => {
  return window.sessionStorage.removeItem(key)
}

const getLocalStorage = (key) => {
  const storage = window.localStorage
  const item = storage.getItem(key)
  let value
  // 数组，对象序列化处理
  if (/^\[|{[\w\W]*}|\]$/g.test(item)) {
    value = JSON.parse(item)
  } else {
    value = item
  }

  return value
}

let timer = null
const setLocalStorage = (key, value, expires = null) => {
  const storage = window.localStorage
  try {
    if (typeof value === 'string') {
      storage.setItem(key, value)
    } else {
      storage.setItem(key, JSON.stringify(value))
    }
  } catch (e) {}

  if (expires) {
    timer && clearTimeout(timer)
    let timeout = expires * 24 * 3600 * 1000
    timer = setTimeout(() => {
      removeLocalStorage(key)
      clearTimeout(timer)
    }, timeout);
  }
}

const removeLocalStorage = (key) => {
  return window.localStorage.removeItem(key)
}

export {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setLocalStorage,
  getLocalStorage
}