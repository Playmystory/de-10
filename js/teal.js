"use strict";

window.teal = {};
window.$t = window.teal;

teal.copyto = function(obj, res) {
    if (obj == null || typeof obj !== 'object') return obj;
    if (obj instanceof Array) {
        for (var i = obj.length - 1; i >= 0; --i)
            res[i] = $t.copy(obj[i]);
    }
    else {
        for (var i in obj) {
            if (obj.hasOwnProperty(i))
                res[i] = $t.copy(obj[i]);
        }
    }
    return res;
}

teal.copy = function(obj) {
    if (!obj) return obj;
    return teal.copyto(obj, new obj.constructor());
}

teal.element = function(name, props, place) {
    var dom = document.createElement(name);
    for (var i in props) dom.setAttribute(i, props[i]);
    if (place) place.appendChild(dom);
    return dom;}
