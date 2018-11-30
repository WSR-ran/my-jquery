//给原型扩展方法，实例可使用
$.fn.extend({
    empty: function() {
        this.each(function () {
            this.innerHTML = '';
        })
        return this;  //链式编程
    },
    remove: function() {
        this.each(function () {
            this.parentNode.removeChild(this);
        })
        return this;
    },
    html: function(html) {
        if (arguments.length == 0) {
            return this.get(0).innerHTML;
        } else {
            this.each(function () {
                this.innerHTML = html;
            })
        }
        return this;
    },
    text: function(text) {
        var res = '';
        if (arguments.length == 0) {
            this.each(function() {
                res += this.innerText;
            })
        } else {
            this.each(function (){
                this.innerText = text;
            })
        }
        return this;
    },
    appendTo: function(selector) {
        var res = [], tempNode = null;
        var $selector = $(selector);
        this.each(function() {
            var self = this;
            $selector.each(function(i) {
                tempNode = i === 0? self: self.cloneNode(true);
                this.appendChild(tempNode);
                res.push(tempNode);
            })
        })
        return jQuery(res);
    },
    prependTo: function(selector) {
        var res = [], tempNode;
        var $selector = jQuery(selector);
        this.each(function() {
            var self = this;
            $selector.each(function(i) {
                tempNode = i === 0? self: self.cloneNode(true);
                this.insertBefore(tempNode, this.firstChild);
                res.push(tempNode);
            })
        })
        return jQuery(res);
    },
    append: function(context) {
        var $context = $(context);
        if (jQuery.isString(context)) {
            this.each(function() {
                this.innerHTML += context;
            }) 
        } else {
            $context.appendTo(this);
        }
        return this;
    },
    prepend: function(context) {
        var $context = jQuery(context);
        if (jQuery.isString(context)) {
            this.each(function() {
                this.innerHTML = context + this.innerHTML;
            })
        } else {
            $context.prependTo(this);
        }
        return this;
    }
});