/**
 * 数据类型
 */

const toStr = Object.prototype.toString;

export default function (val) {
  // string, number
  // function, date, arguments, array, regExp
  // object
  // element
  // null, undefined
  switch(toStr.call(val)) {
    case '[object Function]':
      return 'function';
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    default: {
      if (val === null) return 'null';
      if (val === undefined) return 'undefined';
      if (val && val.nodeType === 1) return 'element';
      if (val === Object(val)) return 'object';

      return typeof val
    }
  }
}