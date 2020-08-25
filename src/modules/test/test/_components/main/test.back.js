with(this) {
    return (data.test + 3 > 2) ? _c("div", {
        "id": "test",
        "style": "color:#f00; background-color:#fff;",
        "class": "xyz"
    }, {
        "class": {
            show: data.test
        },
        "href": 'xxxxxxx'
    }, [_t("我是一段话" + ('我是文本节点') + " <=>= " + ('我是文本2') + "" + ('我是文本3') + "我是结尾 "), _c("span", null, null, [_t("" + ('testText') + "")], true), _c("br", null, null, [], true), _c("input", {
        "placeholder": "我在这里"
    }, {
        "value": data.test,
        "class": {
            xxxx: data.test,
            xxx: data.test - 1
        },
        "@input": {
            func: onInput,
            params: undefined
        },
        "@change": {
            func: onChange,
            params: undefined
        }
    }, [], false), _c("br", null, null, [], true), _c("span", null, null, [_t("" + ('testText2') + " <= "), _c("em", null, null, [_t("wode")], true)], true), _c("button", {
        "style": "display:inline-block;width:200px;height:30px;background-color:#23bb90;color:#fff;text-align:center;line-height:30px;"
    }, {
        "@dblclick": {
            func: dbClick,
            params: [data.test]
        }
    }, [_t("双击")], false), (data.test % 2 === 0) ? _c("Third", null, null, [_c("Four", null, null, [_t("我在这儿等着你回来")], true), _c("div", {
        "slot": "slot1"
    }, null, [_t("no,"), _c("em", null, null, [_t("我才不回来呢")], true)], true), _c("div", {
        "slot": "slot2"
    }, null, [_t("不，"), _c("strong", null, null, [_t("我会回来的")], true)], true), _c("Four", {
        "slot": "slot3"
    }, null, [], true)], false) : "", _c("ul", null, null, [_c("li", null, {
        "v-html": '开始'
    }, [], false), _for(data.arr, function (x, index) {
        return _c("li", null, {
            "key": x,
            "@click": {
                func: click,
                params: [x, index]
            }
        }, [_t("" + (x) + "")], false);
    })], true), _c("slot", null, null, [], true), _c("slot", {
        "name": "slot2"
    }, null, [], true), _c("slot", {
        "name": "slot3"
    }, null, [], true), _c("Second", {
        "ref": "second"
    }, {
        "value": 12,
        "on-click": click,
        "@click": {
            func: click,
            params: undefined
        },
        "list": data.arr,
        "bol": false
    }, [], false), _c("span", null, null, [_t("对对对")], true)], false) : ""
}