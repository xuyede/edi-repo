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

const storageMap = {
  removeLocalStorage, setLocalStorage, getLocalStorage,
  removeSessionStorage, setSessionStorage, getSessionStorage
};

/**
 * storage
 * @param {String} type 类型 
 */
class Storage {
  constructor( type ) {
    this.set = null;
    this.get = null;
    this.remove = null;
    this.type = type || 'local';
    
    if (this.supportStorage()) {
      this.buildStorage();
    } else {
      console.error('[error:storage] Storage错误，如果是浏览器环境，请检查是否打开了无痕模式');
    }
  }

  _localStorage() {
    let suffix = 'LocalStorage';
    this.set = storageMap[`set${suffix}`];
    this.get = storageMap[`get${suffix}`];
    this.remove = storageMap[`remove${suffix}`];
  }

  _sessionStorage() {
    let suffix = 'SessionStorage';
    this.set = storageMap[`set${suffix}`];
    this.get = storageMap[`get${suffix}`];
    this.remove = storageMap[`remove${suffix}`];
  };

  buildStorage() {
    const isLocal = this.type.indexOf('local') != -1;
    if (isLocal) {
      this._localStorage();
    } else {
      this._sessionStorage();
    }
  }

  /** 检测 storage可用性 */
  supportStorage() {
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
  }
  
}

export default Storage;