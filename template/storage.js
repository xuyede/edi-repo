/**
 * storage操作相关
 */

const setSessionStorage = (key, value) => {
  const storage = window.sessionStorage;
  if (typeof value === 'string') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, JSON.stringify(value));
  }
};

const getSessionStorage = (key) => {
  const storage = window.sessionStorage;
  const item = storage.getItem(key);
  let value;
  // 数组，对象序列化处理
  if (/^\[|{[\w\W]*}|\]$/g.test(item)) {
    value = JSON.parse(item);
  } else {
    value = item;
  }

  return value;
};

const removeSessionStorage = (key) => {
  return window.sessionStorage.removeItem(key);
};

const getLocalStorage = (key) => {
  const storage = window.localStorage;
  const item = storage.getItem(key);
  let value;
  // 数组，对象序列化处理
  if (/^\[|{[\w\W]*}|\]$/g.test(item)) {
    value = JSON.parse(item);
  } else {
    value = item;
  }

  return value;
};

let timer = null;
const setLocalStorage = (key, value, expires = null) => {
  const storage = window.localStorage;
  if (typeof value === 'string') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, JSON.stringify(value));
  }

  if (expires) {
    timer && clearTimeout(timer);
    let timeout = expires * 24 * 3600 * 1000;
    timer = setTimeout(() => {
      removeLocalStorage(key);
      clearTimeout(timer);
    }, timeout);
  }
}

const removeLocalStorage = (key) => {
  return window.localStorage.removeItem(key);
};

const supportStorage = () => {
  let storage = (window && window.localStorage) || null;
  if (storage) {
    try {
      storage.setItem("__STORAGE_TEST__", true);
      storage.removeItem("__STORAGE_TEST__");
      return true;
    } catch(e){
      return false;
    }
  } else {
    return false;
  }
};

const storageMap = {
  removeLocalStorage, setLocalStorage, getLocalStorage,
  removeSessionStorage, setSessionStorage, getSessionStorage
};

const _localStorage = (behavior, key, value, expires, original) => {
  let suffix = 'LocalStorage';
  return storageMap[`${behavior}${suffix}`](key, value, expires);
};

const _sessionStorage = (behavior, key, value, original) => {
  let suffix = 'SessionStorage';
  return storageMap[`${behavior}${suffix}`](key, value);
};

const dealStorage = (storage, behavior, key, value, expires, original) => {
  const isLocal = storage.indexOf('local') != -1;

  if (isLocal) {
    return _localStorage(behavior, key, value, expires, original);
  } else {
    return _sessionStorage(behavior, key, value, original);
  }
};

const validateBehavior = (behavior) => {
  const behaviorSet = ['set', 'get', 'remove'];
  return behaviorSet.some(i => i == behavior);
};

const storage = ({storage = 'local', behavior, key, value, expires, original}) => {
  if (!validateBehavior(behavior)) {
    console.error(`[error:storage] ${behavior}: 没有该操作行为(set, get, remove)`);
    return;
  }

  if (supportStorage()) {
    return dealStorage(storage, behavior, key, value, expires, original);
  } else {
    console.error('[error:storage] 浏览器不支持Storage？请检查是否打开了无痕模式');
  }
};


export default storage;
// export {
//   storage,
//   setSessionStorage,
//   getSessionStorage,
//   removeSessionStorage,
//   setLocalStorage,
//   getLocalStorage
// }