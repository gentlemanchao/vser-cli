iframe 消息通信类

<!-- 引入类 -->
import Message from 'classes/iframeMessage';

<!-- 实例化 -->
this.message = new Message();


<!-- 方法 -->

    /**
     * 消息监听
     * param [function] callback  收到消息的回调方法
     * param [String] namespace  函数命名空间 非必填（如果存在移除某个监听事件的需求，请传入此值）
     */
    onMessage(callback, namespace)

    /**
     * 移除事件
     * @param {String} namespace 监听时创建的函数命名空间
     */
    removeMessage(namespace)

    /**
     * 发送消息给iframe窗口
     * param [string|object] iframe domElement对象或者iframe选择器
     * param [object] _data 发送给iframe的数据
     */
    postToIframe(iframe, _data)

   /**
     * 给父窗口发送消息
     * param [object] _data 发送给父窗口的数据
     */
    postToParent(_data)

    /**
     * 销毁 移除添加的所有事件
     */
    destroy()

<!-- 示例 -->

<!-- 消息监听 -->
this.message.onMessage((e) => {
    if (e.type === 'xxx') {
        <!-- your code -->
    } 
});

<!-- 给父窗口发送消息 -->
this.message.postToParent({
    type: 'xxx',
    data: null
});

<!-- 给iframe窗口发送消息 -->
this.message.postToIframe($('iframe'),{
    type: 'xxx',
    data: null
});
