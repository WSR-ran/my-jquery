(function (w) {
    var version = '1.0.0';
    /**
     * 工厂函数
     */
    function jQuery(selector) {
        return new jQuery.fn.init(selector);
    }
    /**
     * 替换原型
     */
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        jquery: version,
        // 代表所有实例默认的选择器
        selector: '', 
        length: 0,
        // 实例转数组
        toArray: function() {
            return [].slice.call(this);
        },
        // 获取指定下标元素，返回原生dom
        get: function(i) {
            return i == null? this.toArray(): (i >= 0? this[i]: this[this.length + i]);
        },
        // 遍历实例
        each: function(fn) {
            return jQuery.each(this, fn);
        },
        // 通过实例返回新的数组
        map: function(fn) {
            return jQuery.map(this, fn);
        },
        // 截取实例的部分元素，构成一个新的实例返回
        slice: function() {
            return jQuery([].slice.apply(this, arguments));
        },
        // 获取指定下标的元素，获取的是jQuery类型的实例
        eq: function(i) {
            return i == null? jQuery(): jQuery(this.get(i));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice
    }
    /**
     * 添加extend方法
     * 一个参数，谁调用就给谁混入
     * 多个参数，后面的内容混入到第一个对象中
     */
    jQuery.extend = jQuery.fn.extend = function(obj) {
        var argLen = arguments.length;
        for (var i = 0; i < argLen; i++) {
            for (var key in arguments[i]) {
                arguments[0][key] = arguments[i][key];
            }
        }
        return arguments[0];
    },
    /**
     * 添加静态方法
     */
    jQuery.extend({
        // 变量对象或类数组
        each: function(obj, fn) {
            var i, len, key;
            if (jQuery.isLikeArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    if (fn.call(obj[i], i, obj[i]) == false) {
                        break;
                    }
                }
            }else {
                for (key in obj) {
                    if (fn.call(obj[i], i, obj[i]) == false) {
                        break;
                    }
                }
            }
            return obj;
        },
        map: function(obj, fn) {
            //每次遍历需要把key,val传给回调，收集回调的返回值组成数组
            var i, len, key, res = [];
            if ('length' in obj) {
                for (i = 0, len = obj.length; i < len; i++) {
                    res.push(fn.call(obj[i], obj[i], i));
                }
            }else {
                for ( key in obj ) {
                    res.push(fn.call(obj[key], obj[key], key));
                }
            }
            return res;
        },
        // 去掉首尾空白字符
        trim: function (str) {
            if (!str) return str;
            if (str.trim) {
                return str.trim();
            }else {
                return str.replace(/^\s+|\s+$/g, '');
            }
        },
        isHTML: function (html) {
            return !!html && html.charAt(0) === '<' && html.charAt(html.length - 1) === '>' && html.length >= 3;
        },
        isFunction: function(fn) {
            return typeof fn == 'function';
        },
        isWindow: function(w) {
            return !!w && w.window === w;
        },
        isObject: function(obj) {
            if (obj == null) return false;
            if (typeof obj === 'object' || typeof obj === 'function') {
                return true;
            }
            return false;
        },
        isString: function(str) {
            return typeof str === 'string';
        },
        isLikeArray: function (arr) {
            if (jQuery.isFunction(arr) || jQuery.isWindow(arr) || !jQuery.isObject(arr)) {
                return false;
            }
            //真数组
            if (({}).toString.call(arr) === '[object Array]') {
                return true;
            }
            //伪数组
            if ('length' in arr && (arr.length === 0 || arr.length - 1 in arr)) {
                return true;
            }
            return false;
        },
        /**
         * 当DOM元素已经加载，并且页面（包括图片）已经完全呈现时，会发生ready事件
         */
        ready: function(fn) {
            //页面构建完毕，才执行fn
            if (document.readyState == 'complete') {
                fn();
            } else if (document.addEventListener) {
                document.addEventListener( 'DOMContentLoaded', fn );
            } else {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState == 'complete') {
                        fn();
                    }
                })
            }
        }
    });

    /**
     * 构造函数，放在了原型上
     */
    var init = jQuery.fn.init = function (selector) {
        if (!selector) {
            return this;
        }
        if (jQuery.isFunction (selector)) {
            jQuery.ready(selector);
        } else if (jQuery.isString(selector)) {
            selector = jQuery.trim(selector);
            if (jQuery.isHTML(selector)) {
                var tempDiv = document.createElement( 'div' );
                tempDiv.innerHTML = selector;
                [].push.apply(this, tempDiv.childNodes);  //push给实例
            } else {
                try {
                    [].push.apply( this, document.querySelectorAll(selector));
                }catch(e) {
                    // 如果报错了，那么手动补一个length属性，代表没有获取到任何元素
                    this.length = 0;
                }
            }
        } else if (jQuery.isLikeArray(selector)) {
            [].push.apply(this, [].slice.call(selector));
        } else {
            this[0] = selector;
            this.length = 1;
        }
    };
    //原型替换，外界就可以通过工厂给实例扩展方法
    init.prototype = jQuery.fn;
    w.jQuery = w.$ = jQuery;
}(window));