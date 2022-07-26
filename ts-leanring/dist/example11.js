"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post = {
    title: 'My Title',
    content: 'My Content',
    pid: 3
};
var cache = {};
cache.session = 'SessionID';
// cache.lastAccessTime = Date.now() // 这里会报错。因为lastAccessTime必须为string类型的值，而Date.now()返回的是number类型的值
//# sourceMappingURL=example11.js.map