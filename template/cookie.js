/**
 * cookie操作相关
 */

/**
 * 获取cookie
 * @param {String} name
 * @return {String|Null}
 */
export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}(?:=([^;]*))?(;|$)`);
  const val = document.cookie.match(reg);

  if (val) {
    return val[2] ? unescape(val[2]) : '';
  }
  return null;
}

/**
 * 写入cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} [expires]
 * @param {Stirng} [path]
 * @param {String} [domain]
 * @param {Boolean} [secure]
 */
export function setCookie(name, value, expires = null, path = '/', domain = null, secure = false) {
  const exp = new Date();

  if (expires) {
    exp.setTime(exp.getTime() + (expires * 24 * 3600 * 1000));
  }

  document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

/**
 * 删除cookie
 * @param {String} name
 * @param {String} [path]
 * @param {String} [domain]
 * @param {Boolean} [secure]
 */
export function delCookie(name, path = '/', domain = null, secure = false) {
  const value = getCookie(name);

  if (value != null) {
    const exp = new Date();
    exp.setMinutes(exp.getMinutes() - 1000);
    /* eslint-disable prefer-template,max-len */
    document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  }
}



