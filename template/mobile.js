/**
 * 初始化移动端时的基本配置
 */

// <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
// <meta name="format-detection" content="telephone=no,email=no">
// <meta name="apple-mobile-web-app-capable" content="no">
// <meta name="apple-touch-fullscreen" content="yes">
// <meta name="screen-orientation" content="portrait">
// <meta name="x5-orientation" content="portrait"></meta>

const META_MAP = {
  'viewport': 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover',
  'format-detection': 'telephone=no,email=no',
  'apple-mobile-web-app-capable': 'no',
  'apple-touch-fullscreen': 'yes',
  'screen-orientation': 'portrait',
  'x5-orientation': 'portrait'
}

/**
 * 初始化移动端基本配置
 * @param {*} ifCoverMeta 是否覆盖原有meta标签,内容为 META_MAP的全部
 */
function initMobile(ifCoverMeta = false) {
  // 设置全局fix_font_size
  fixFontSize(document, window);
  // 设置特定的 meta标签
  if (ifCoverMeta) {
    coverMetaDom();
  }
  
  function coverMetaDom() {
    const metaEntries = Object.entries(META_MAP)
    metaEntries.forEach(metaArr => {
      const [ key, value ] = metaArr
      const oMeta = document.getElementsByName(key)[0];
      if (oMeta) {
        oMeta.content = value
      } else {
        const cMeta = document.createElement('meta')
        cMeta.key = value
        document.head.appendChild(cMeta)
      }      
    })
  }

  function fixFontSize(doc, win) {
    let basicWidth = window.basicWidth || 750;
    let minWidth = 320;
    let htmlElement = doc.documentElement;
    let dpr = parseInt(window.devicePixelRatio || 1, 10);
    let recalc = function() {
        let clientWidth = htmlElement.clientWidth || (basicWidth / 2);
        window.rootFontSize = 100 * (clientWidth / basicWidth);
        clientWidth = clientWidth < minWidth? minWidth : clientWidth;
        htmlElement.style.fontSize = 100 * (clientWidth / basicWidth) + 'px';
        htmlElement.setAttribute("data-dpi", dpr);
    };
    recalc();
    if (!win.addEventListener) return;
    win.addEventListener('resize', recalc, false);
  }
}

export default initMobile;