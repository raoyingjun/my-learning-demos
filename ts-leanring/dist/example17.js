"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 仅使用export关键字修饰的将会暴露给外界
var HttpUtil;
(function (HttpUtil) {
    // 暴露的属性
    HttpUtil.TIMEOUT = 60 * 1000;
    // 不暴露该属性
    var BASE_URL = 'https://www.example.com';
    // 暴露的方法
    HttpUtil.sendGet = function () {
        console.log('Requesting by get method');
    };
    // 不暴露该方法
    var cancelRequest = function () {
        console.log('Cancelled request');
    };
})(HttpUtil || (HttpUtil = {}));
console.log(HttpUtil.TIMEOUT);
// console.log(HttpUtil.BASE_URL) // 这里会报错。由于没有暴露该属性，因此不能访问到该属性
console.log(HttpUtil.sendGet);
// console.log(HttpUtil.cancelRequest)// 这里会报错。由于没有暴露该方法，因此不能访问到该方法
//# sourceMappingURL=example17.js.map