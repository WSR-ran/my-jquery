/**
 * 添加静态方法
 */
$.extend({
    /*添加事件*/
    addEvent: function( ele, type, fn ) {
        if(!ele.nodeType || !jQuery.isString(type) || !jQuery.isFunction(fn)) return;
        if(ele.addEventListener) {
            ele.addEventListener(type, fn);
        }else {
            ele.attachEvent( 'on' + type, fn);
        }
    },
    /*移除事件*/
    removeEvent: function(ele, type, fn) {
        if(!ele.nodeType || !jQuery.isString(type) || !jQuery.isFunction(fn)) return;
        if( ele.removeEventListener ) {
            ele.removeEventListener( type, fn );
        }else {
            ele.detachEvent( 'on' + type, fn );
        }
    }
});

/**
 * 给原型扩展方法
 */
$.fn.extend({
    /*事件绑定*/
    on: function(type, fn) {
        this.each(function() {
            var self = this;
            this.$_event_cache = this.$_event_cache || {};
            if( !this.$_event_cache[ type ] ) {
                this.$_event_cache[ type ] = [];
                this.$_event_cache[ type ].push( fn );
                jQuery.addEvent( this, type, function( e ) {
                    jQuery.each( self.$_event_cache[ type ], function() {
                        this.call( self, e );
                    } );
                } );
            }else {
                this.$_event_cache[ type ].push( fn );
            }
        });
        return this;
    },
    /*事件移除*/
    off: function( type, fn ) {
        var argLen = arguments.length;
        this.each( function() {
            if (!this.$_event_cache) {
                return;
            } else {
                if( argLen === 0 ) {
                    for( var key in this.$_event_cache ) {
                        this.$_event_cache[ key ] = [];
                    }
                } else if( argLen === 1 ) {
                    this.$_event_cache[ type ] = [];
                } else {
                    for( var i = this.$_event_cache[ type ].length - 1; i >= 0; i-- ) {
                        if( this.$_event_cache[ type ][ i ] === fn ) {
                            this.$_event_cache[ type ].splice( i, 1 );
                        }
                    }
                }
            }
        });
        return this;
    }
});

/*得到存储所有事件的数组*/
var events = "blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu".split(' ');

/*批量给原型添加事件*/
jQuery.each(events, function(i, eventName) {
    // 给原型添加的方法 this指向实例
    $.fn[eventName] = function(fn) {
        return this.on(eventName, fn);
    }
});
