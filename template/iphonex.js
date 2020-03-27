/**
 * 判断ios全面屏
 */
const ua = window.navigator.userAgent;
const isIpad = ua.match(/(iPad).*OS\s([\d_]+)/);
const isIphone = !isIpad && ua.match(/(iPhone\sOS)\s([\d_]+)/)

function isIphoneX() {
  if (!isIphone) {
    return false
  }

  // X XS, XS Max, XR
  const deviceInfo = [
    // iPhone X/ iPhone XS
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812,
    },
    // iPhone XS Max/ iPhone 11 PRO
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896,
    },
    // iPhone XR/ iPhone 11
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896,
    },
  ];
  const { devicePixelRatio, screen } = window;
  const { width, height } = screen;
  for (let i = 0, l = deviceInfo.length; i < l; i++) {
    const current = deviceInfo[i];
    if (current.devicePixelRatio === devicePixelRatio && current.width === width && current.height === height) {
      return true;
    }
  }
  return false;
}

export default isIphoneX
