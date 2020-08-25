function setViewport(callback) {
    "use strict";
    var ua = window && window.navigator && window.navigator.userAgent;
    if (!ua) return;
    ua = ua.toLowerCase();
    var ratio = 1;
    //苹果系列 或者 qq浏览器 uc浏览器 微信
    if (/(ipad|iphone|ipod|mqqbrowser|ucbrowser|micromessenger|miuibrowser)/i.exec(ua)) {
        ratio = window.devicePixelRatio;
        ratio = ratio >= 3 ? 3 : ratio >= 2 ? 2 : 1;
    }
    var scale = 1 / ratio;
    var el = document.querySelector('meta[name="viewport"]');
    var metaStr = "initial-scale=" + scale + ",maximum-scale=" + scale + ",minimum-scale=" + scale +
        ",user-scalable=no,width=device-width,,viewport-fit=cover";
    if (el) {
        el.setAttribute("content", metaStr);
    } else {
        var meta = '<meta name="viewport" content="' + metaStr + '"/>';
        el = document.createElement('meta');
        el.setAttribute("name", "viewport");
        el.setAttribute("content", meta);
        document.head.appendChild(el);
    }
    callback && callback();
}

/*
    # 按照宽高比例设定html字体, width=device-width initial-scale=1版
    # @pargam win 窗口window对象
    # @pargam option{
      designWidth: 设计稿宽度，必须
      designFontSize: 基准字体大小
      callback: 字体计算之后的回调函数，可选
    }
    # return Boolean;
    # ps:请尽量第一时间运行此js计算字体
*/
function setRootFontSize(win, option) {
    var designWidth = option.designWidth,
        designFontSize = option.designFontSize || 20,
        callback = option.callback || null,
        root = document.documentElement,
        newSize;
    var _deviceWinWidth = Math.min(win.innerWidth, win.innerHeight);
    //返回root元素字体计算结果
    function _getNewFontSize() {
        var scale = _deviceWinWidth / designWidth;
        return parseInt(scale * 10000 * designFontSize) / 10000;
    };
    ! function () {
        newSize = _getNewFontSize();
        if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
            root.style.fontSize = newSize + "px";
            return callback && callback(newSize);
        };
    }();

}

if (window.viewportConfig) {
    var _viewportConfig = window.viewportConfig;
    if (_viewportConfig.checkRatio) {
        setViewport(function () {
            if (_viewportConfig.designWidth && _viewportConfig.designFontSize) {
                setTimeout(function () {
                    setRootFontSize(window, _viewportConfig);
                });
            }
        });
    } else {
        if (_viewportConfig.designWidth && _viewportConfig.designFontSize) {
            setRootFontSize(window, _viewportConfig);
            setTimeout(function () {
                setRootFontSize(window, _viewportConfig);
            }, 100);
            setTimeout(function () {
                setRootFontSize(window, _viewportConfig);
            }, 2000);
            window.addEventListener('DOMContentLoaded', function () {
                setRootFontSize(window, _viewportConfig);
            });
            window.addEventListener('load', function () {
                setRootFontSize(window, _viewportConfig);
            });
        }
    }
}