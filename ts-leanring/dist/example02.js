"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
// 作用域
/**
 * 使用此种方式声明的全局变量a会报重复声明变量的错位
 * 因为该方式声明与example01.ts文件的全局变量a冲突
 */
var a = 'a';
exports.a = a;
//# sourceMappingURL=example02.js.map