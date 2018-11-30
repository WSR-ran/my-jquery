/**
 * 添加静态方法
 */
$.extend({
    ajaxSettings: {
        url: location.href,    
        type: "GET",           
        async: true,          
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",   
        timeout: null,         
        dataType: 'JSON',      
        success: function(){},
        error: function(){},
        complete: function(){},
    },
    /*把对象转换为url参数形式的字符串*/
    urlStringify: function(data) {
        var result = '', key;
        if (!jQuery.isObject(data)) {
            return result;
        }
        for (key in data) {
            result += window.encodeURIComponent( key ) + '=' + window.encodeURIComponent( data[ key ] ) + '&';
        }
        return result.slice( 0, -1 );
    },
    /*加工options*/
    processOptions: function(options) {
        var optionsNew = {};
        optionsNew = {};
        jQuery.extend( optionsNew, jQuery.ajaxSettings, options );
        optionsNew.data = jQuery.urlStringify( optionsNew.data );
        optionsNew.type = optionsNew.type.toUpperCase();
        if( optionsNew.type === 'GET' ) {
            optionsNew.url += '?' + optionsNew.data;
            optionsNew.data = null;
        }
        return optionsNew;
    },
    ajax: function(options) {
        var optionsNew, xhr, result, timer;
        optionsNew = jQuery.processOptions( options );
        xhr = new XMLHttpRequest();
        xhr.open( optionsNew.type, optionsNew.url, optionsNew.async );
        if( optionsNew.type === 'POST' ) {
            xhr.setRequestHeader( 'Content-Type', optionsNew.contentType );
        }
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 ) {
                // 在指定时间内完成了请求，那么清除定时器
                clearTimeout( timer );
                optionsNew.complete();
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    switch (optionsNew.dataType) {
                        case 'JSON':
                            result = JSON.parse(xhr.responseText);
                            break;
                        case 'script':
                            eval(xhr.responseText);
                            result = xhr.responseText;
                            break;
                        case 'style':
                            $('<style></style>').html(xhr.responseText).appendTo('head');
                            result = xhr.responseText;
                            break;
                        default:
                            result = xhr.responseText;
                            break;
                    }
                    optionsNew.success(result);
                }else {
                    optionsNew.error(xhr.status);
                }
            }
        };
        // 如果设置了超时，那么开始一个定时器
        if (optionsNew.timeout) {
            timer = setTimeout( function() {
                optionsNew.error( '超时' );
                xhr.onreadystatechange = null;
            }, optionsNew.timeout);
        }
        xhr.send( optionsNew.data );
    },
    get: function(url, data, fn) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            url: url,
            data: data,
            success: fn
        });
    },
    post: function(url, data, fn) {
        fn = fn || data || function(){};
        jQuery.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: fn
        });
    },
    getJSON: function(url, data, fn) {
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'JSON',
            url: url,
            data: data,
            success: fn
        });
    },
    /*加载js脚本*/
    getScript: function(url, data, fn) {
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'script',
            url: url,
            data: data,
            success: fn
        });
    },
    /*加载样式*/
    getCss: function(url, data, fn) {
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'style',
            url: url,
            data: data,
            success: fn
        });
    }
});