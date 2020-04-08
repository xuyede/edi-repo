/**
 * extend
 * @see https://github.com/justmoon/node-extend
 */

const hasOwn = Object.prototype.hasOwnProperty;
const toStr = Object.prototype.toString;

function isArray(arr) {
  return Array.isArray(arr);
}

function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  const hasOwnConstructor = hasOwn.call(obj, 'constructor');
  const hasIsPrototypeOf = obj.constructor &&
    obj.constructor.prototype &&
    hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');

  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  let key;
  for (key in obj) { /**/ }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}

/**
 * Extend one object with one or more others, returning the modified object.
 * extend ( [deep], target, object1, [objectN] )
 * @param {Boolean} deep If set, the merge becomes recursive (i.e. deep copy).
 * @param {Object} target The object to extend.
 * @param {Object} object1 The object that will be merged into the first.
 * @param {Object} objectN More objects to merge into the first.
 */
function extend() {
  /* eslint-disable prefer-rest-params */
  let options;
  let name;
  let src;
  let copy;
  let copyIsArray;
  let clone;
  let target = arguments[0];
  let i = 1;
  let deep = false;
  const length = arguments.length;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }
  if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
    target = {};
  }

  for (; i < length; ++i) {
    options = arguments[i];
    // Only deal with non-null/undefined values
    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target !== copy) {
          /* eslint-disable no-cond-assign */
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            target[name] = copy;
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
}

export default extend;