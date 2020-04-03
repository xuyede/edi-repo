/**
 * 事件总线  
 * import EventBus from 'eventBus.js';
 * window.EventBus = EventBus;
 */

class EventEmit {
  constructor () {
    // 事件字典
    this.listeners = {};
  }

  /**
   * 注册事件
   * @param {*} name 
   * @param {*} fn 
   * @param {*} once 
   */
  on (name, fn, once) {
    let ls = this.listeners[name];

    if (!ls) {
      ls = this.listeners[name] = [];
    }
    ls.push(fn);
    if (once) {
      ls.once = true;
    }
  }

  /**
   * 注册事件，只执行一次
   * @param {*} name 
   * @param {*} fn 
   */
  once (name, fn) {
    this.on(name, fn, true)
  }

  /**
   * 检测字典中是否已注册目标事件
   * @param {*} name 
   */
  has (name) {
    return this.listeners[name];
  }

  /**
   * 移除指定事件
   * @param {*} name 
   */
  off (name) {
    delete this.listeners[name];
  }

  /**
   * 移除所有事件
   */
  offAll () {
    this.listeners = {};
  }

  /**
   * 注册事件
   * @param {*} name 
   * @param  {...any} arg 
   */
  emit (name, ...arg) {
    let ls = this.listeners[name];

    if (!ls) {
      console.warn(`${name}事件未注册，请使用on|once注册事件`);
      return;
    }

    for (let i = 0, l = ls.length; i < l; i++) {
      ls[i].apply(arg);
    }

    if (ls.once) {
      this.off(name);
    }
  }
}

export default new EventEmit();