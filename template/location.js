const getHref = () => {
  return window.location.href;
};

const getHost = () => {
  return window.location.host;
};

const getHostName = () => {
  return window.location.hostname
};

const getQuery = (name, url = undefined) => {
  //参数：变量名，url为空则表从当前页面的url中取
  let u = url || window.location.search.replace("&amp;", "&")
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  const r = u.substr(u.indexOf("\?") + 1).match(reg);
  return r != null ? r[2] : "";
};


export {
  getHref,
  getHost,
  getHostName,
  getQuery
}