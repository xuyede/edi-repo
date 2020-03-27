
export function getDeviceInfo() {
  const ua = window.navigator.userAgent.toLowerCase();
  /* eslint-disable no-nested-ternary, max-len, no-useless-escape */
  const device = (ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1 || ua.indexOf('ipod') !== -1) ? 'ios' : (ua.indexOf('android') !== -1 ? 'android' : '');
  let version = '';
  if (device === 'ios') {
    version = ua.match(/os (.*?) like mac os/)[1].replace(/_/g, '.') || '';
  } else if (device === 'android') {
    version = ua.match(/android\s([0-9\.]*)/)[1] || '';
  }

  // 屏幕宽
  const sw = (window.screen.width || '').toString() || '0';
  // 屏幕高
  const sh = (window.screen.height || '').toString() || '0';
  // 设备像素比
  const dpr = window.devicePixelRatio === parseInt(window.devicePixelRatio, 10) ? parseFloat(window.devicePixelRatio).toFixed(1) || '' : parseFloat(window.devicePixelRatio).toString() || '';

  return {
    os: device,
    osver: version,
    sw,
    sh,
    dpr
  };
}

export function getIOSVersion() {
  const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
  return parseInt(version[1], 10);
}

export function getWeChatVersion() {
  const version = navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i);
  return version[1];
}

export function getBrowser() {
  const ua = window.navigator.userAgent || '';
  const isAndroid = /android/i.test(ua);
  const isIos = /iphone|ipad|ipod/i.test(ua);
  const isWechat = /micromessenger\/([\d.]+)/i.test(ua);
  const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua);
  const isQQ = /qq\/([\d.]+)/i.test(ua);
  const isQQBrowser = /(qqbrowser)\/([\d.]+)/i.test(ua);
  const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua);
  // 安卓 chrome 浏览器，很多 app 都是在 chrome 的 ua 上进行扩展的
  const isOriginalChrome = /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) && isAndroid;
  // chrome for ios 和 safari 的区别仅仅是将 Version/<VersionNum> 替换成了 CriOS/<ChromeRevision>
  // ios 上很多 app 都包含 safari 标识，但它们都是以自己的 app 标识开头，而不是 Mozilla
  const isSafari = /safari\/([\d.]+)$/i.test(ua) && isIos && ua.indexOf('Crios') < 0 && ua.indexOf('Mozilla') === 0;

  return {
    isAndroid,
    isIos,
    isWechat,
    isWeibo,
    isQQ,
    isQQBrowser,
    isQzone,
    isOriginalChrome,
    isSafari,
  };
}
