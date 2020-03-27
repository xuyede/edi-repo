/**
 * 常用表单正则匹配
 */

// 手机号种类太多，1开头就可以了
const validateTelphone = function (val) {
  return /^1\d{10}$/.test(val)
}

// 信用卡一般16位
// 储蓄卡除了招商银行16位，交通银行17位，其他银行基本都是19位
// 貌似没有18位的卡号，先预留
const validateBankCard = function (val) {
  return /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/.test(val)
}

// 身份证
const validateIdCard = function (val) {
  return /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/.test(val);
}

// 空值
const validateEmpty = function (val) {
  return val !== ''
}

// 字符的长度，中文字符占2位长度
const validateInputLen = function (val, limit = 20) {
  return val.replace(/[^\x00-\xff]/g, "01").length <= limit
}

// 检测中文字符，某些emoji表情为中文字符
const validateChinese = function (val) {
  return /[^\x00-\xff]/g.test(val)
}

// 验证码
const validateCode = function (val, len = 6) {
  return new RegExp(`^\d{${len}}$`).test(val)
}

// 格式化价格 1000000.12 -> 1,000,000.12
const parsePrice = function (val, target = ',') {
  return val.replace(/\B(?=(\d{3})+(?!\d)$)/g, target)
}

// 格式化银行卡 6217007200065544010 -> 6217 0072 0006 5544 010
const parseBankCard = function (val) {
  return val.replace(/([0-9A-z\*]{4})(?=.)/g, ($, $1) => $1 + ' ')
}

// 对手机号隐藏 18100000008 -> 181****0008
const parseHideTel = function (val) {
  return val.replace(/([0-9]{3})([0-9]{4})([0-9]*)/g, ($, $1, $2, $3) => $1 + '****' + $3)
}

// 对身份证隐藏 441909199909090099 -> 441909**********99
const parseHideIdCard = function (val) {
  let len = val.length
  return val.replace(/([0-9]{6})([0-9]*)([0-9]|[A-z]{2})/g, ($, $1, $2, $3) => $1 + createString('*', len - 8) + $3)
} 

// 对银行卡隐藏 6217007200065544010 -> 6217***********4010
// parse=true -> 6217 **** **** ***4 010
const parseHideBankCard = function (val, parse = false) {
  let len = val.length
  let bankCard = val.replace(/([0-9]{4})([0-9]*)([0-9]{4})/g, ($, $1, $2, $3) => $1 + createString('*', len - 8) + $3)
  if (parse) {
    return parseBankCard(bankCard)
  }
  return bankCard
}

function createString (str, len) {
  if (str.length >= len) return str.substr(0, len);
  if (str.length < len) return createString(str + str, len)
  return str
}


export {
  validateTelphone,
  validateBankCard,
  validateIdCard,
  validateEmpty,
  validateInputLen,
  validateChinese,
  validateCode,
  parsePrice,
  parseBankCard,
  parseHideTel,
  parseHideBankCard,
  parseHideIdCard
}
