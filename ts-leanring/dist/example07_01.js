"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toStringSum(a, b) {
    return (a + b).toString();
}
toStringSum(100, 200);
// 可选参数。
function say1(name, addr) {
    addr = addr ? "\uFF0Cfrom " + addr + "." : '.';
    console.log("Hello, I am " + name + addr);
}
say1('Rose', 'ShenZhen');
say1('Jack');
// 参数默认值。使用参数默认值，则该参数同时也会变成可选参数
function say2(name, addr) {
    if (addr === void 0) { addr = 'BeiJing'; }
    addr = addr ? "\uFF0Cfrom " + addr + "." : '.';
    console.log("Hello, I am " + name + addr);
}
say2('Rose', 'ShenZhen');
say2('Jack');
//# sourceMappingURL=example07_01.js.map