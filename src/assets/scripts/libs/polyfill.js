//给String原型增加 trim方法
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
}
if (!String.prototype.startWith) {
    String.prototype.startsWith = function (str) {
        var reg = new RegExp("^" + str);
        return reg.test(this);
    }
}

if (!String.prototype.endWith) {
    String.prototype.endsWith = function (str) {
        var reg = new RegExp(str + "$");
        return reg.test(this);
    }
}
if (!Function.prototype.bind)(function () {
    var ArrayPrototypeSlice = Array.prototype.slice;
    Function.prototype.bind = function (otherThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
            baseArgsLength = baseArgs.length,
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                baseArgs.length = baseArgsLength; // reset to default base arguments
                baseArgs.push.apply(baseArgs, arguments);
                return fToBind.apply(
                    fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
                );
            };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
})();

// Array
if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (elt /*, from*/ ) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ?
            Math.ceil(from) :
            Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (callback /*, thisArg*/ ) {
        var T, A, k;

        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };
}
if (typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback.apply(this, [this[i], i, this]);
        }
    };
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (func, thisArg) {
        'use strict';
        if (!((typeof func === 'Function' || typeof func === 'function') && this))
            throw new TypeError();

        var len = this.length >>> 0,
            res = new Array(len), // preallocate array
            t = this,
            c = 0,
            i = -1;
        if (thisArg === undefined) {
            while (++i !== len) {
                // checks to see if the key was set
                if (i in this) {
                    if (func(t[i], i, t)) {
                        res[c++] = t[i];
                    }
                }
            }
        } else {
            while (++i !== len) {
                // checks to see if the key was set
                if (i in this) {
                    if (func.call(thisArg, t[i], i, t)) {
                        res[c++] = t[i];
                    }
                }
            }
        }

        res.length = c; // shrink down array to proper size
        return res;
    };
}

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ! ToString(k).
            // b. Let kValue be ? Get(O, Pk).
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
            // d. If testResult is true, return k.
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
                return k;
            }
            // e. Increase k by 1.
            k++;
        }

        // 7. Return -1.
        return -1;
    }
}

if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
            return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 7. Repeat, while k < len
        while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            // c. Increase k by 1.
            // NOTE: === provides the correct "SameValueZero" comparison needed here.
            if (o[k] === searchElement) {
                return true;
            }
            k++;
        }

        // 8. Return false
        return false;
    }
}

// Object

if (typeof Object.create != 'function') {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    Object.create = (function () {
        //为了节省内存，使用一个共享的构造器
        function Temp() {}

        // 使用 Object.prototype.hasOwnProperty 更安全的引用 
        var hasOwn = Object.prototype.hasOwnProperty;

        return function (O) {
            // 1. 如果 O 不是 Object 或 null，抛出一个 TypeError 异常。
            if (typeof O != 'object') {
                throw TypeError('Object prototype may only be an Object or null');
            }

            // 2. 使创建的一个新的对象为 obj ，就和通过
            //    new Object() 表达式创建一个新对象一样，
            //    Object是标准内置的构造器名
            // 3. 设置 obj 的内部属性 [[Prototype]] 为 O。
            Temp.prototype = O;
            var obj = new Temp();
            Temp.prototype = null; // 不要保持一个 O 的杂散引用（a stray reference）...

            // 4. 如果存在参数 Properties ，而不是 undefined ，
            //    那么就把参数的自身属性添加到 obj 上，就像调用
            //    携带obj ，Properties两个参数的标准内置函数
            //    Object.defineProperties() 一样。
            if (arguments.length > 1) {
                // Object.defineProperties does ToObject on its first argument.
                var Properties = Object(arguments[1]);
                for (var prop in Properties) {
                    if (hasOwn.call(Properties, prop)) {
                        obj[prop] = Properties[prop];
                    }
                }
            }

            // 5. 返回 obj
            return obj;
        };
    })();
}

if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
        if (target == null || target === undefined) {
            target = {};
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [],
                prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}

// Object.values
if (!Object.values) Object.values = function (obj) {
    if (obj !== Object(obj))
        throw new TypeError('Object.values called on a non-object');
    var val = [],
        key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            val.push(obj[key]);
        }
    }
    return val;
}

//ie9 不支持console
window.console = window.console || (function () {
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () {};
    return c;
})();

if (!document.head) {
    document.head = document.getElementsByTagName('head')[0]
}