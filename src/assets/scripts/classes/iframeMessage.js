import 'jQuery';
import Util from 'utils/util';

/**
 * iframe间通信类 >=ie8
 * author:曹健宇
 * modifyTime:2018-10-09
 * @class Message
 */
class Message {
    constructor(options) {
        this.callStacks = {}; //事件队列
    }
    /**
     * 发送消息给iframe窗口
     * param [string|object] iframe domElement对象或者iframe选择器
     * param [object] _data 发送给iframe的数据
     */
    postToIframe(iframe, _data) {
        if (!iframe || iframe === '') {
            return;
        }
        var el = null;
        if(typeof(iframe) === 'string'){
            el =  $(iframe)[0];
        }else if(typeof(iframe) === 'object' && iframe.nodeType && typeof(iframe.nodeName) === 'string'){
            el = iframe;
        }else{
            console.error('错误的iframe参数！',iframe);
            return;
        }
        var data = (Util.isIe9() || Util.isBelowIe9()) ? JSON.stringify(_data) : _data;
        el && el.contentWindow && el.contentWindow.postMessage && el.contentWindow.postMessage(data, "*");
    }
    /**
     * 给父窗口发送消息
     * param [object] _data 发送给父窗口的数据
     */
    postToParent(_data) {
        let data = (Util.isIe9() || Util.isBelowIe9()) ? JSON.stringify(_data) : _data;
        window.parent && window.parent.postMessage && window.parent.postMessage(data, "*");
    }
    /**
     * 消息监听
     * param [function] callback  收到消息的回调方法
     * param [String] namespace  函数命名空间
     */
    onMessage(callback, namespace) {
        this._addEvent(window, 'message', this._createFunc(callback, namespace));
    }
    /**
     * 移除事件
     * @param {String} namespace 监听时创建的函数命名空间
     */
    removeMessage(namespace) {
        this.callStacks[namespace] && Util.typeOf(this.callStacks[namespace]) === 'function' && this._removeEvent(window, 'message', this.callStacks[namespace]);
    }
    /**
     * 创建命名函数
     * @param {*} callback 
     */
    _createFunc(callback, namespace) {
        let id = new Date().getTime().toString(36);
        let func = this.callStacks[namespace || id] = function (e) {
            let data = e.data;
            data = (Util.isIe9() || Util.isBelowIe9()) ? JSON.parse(data) : data;
            callback && Util.typeOf(callback) === 'function' && callback.call(e, data);
        };
        return func;
    }
    /**
     * 添加事件
     * @param {*} el 
     * @param {*} type 
     * @param {*} func 
     */
    _addEvent(el, type, func) {
        if (Element.prototype.addEventListener) {
            el.addEventListener(type, func, false);
        } else if (el.attachEvent) {
            el.attachEvent(`on${type}`, func);
        }
    }
    /**
     * 移除事件
     * @param {*} el 
     * @param {*} type 
     * @param {*} func 
     */
    _removeEvent(el, type, func) {
        if (Element.prototype.removeEventListener) {
            el.removeEventListener(type, func, false);
        } else if (el.attachEvent) {
            el.detachEvent(`on${type}`, func);
        }
    }
    /**
     * 销毁 移除添加的所有事件
     */
    destroy() {
        for (let i in this.callStacks) {
            let func = this.callStacks[i];
            Util.typeOf(func) === 'function' && this._removeEvent(window, 'message', func);
        }
    }

}
export default Message;