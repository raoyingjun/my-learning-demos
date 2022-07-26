"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 类型被自动推断为number
var age = 18;
// age = '18' // 这里会报错，因为赋值的类型为string，而推断的类型为number
// 被推断为any。可以设置任何类型的值
var foo;
foo = 100;
foo = '100';
foo = {};
//# sourceMappingURL=example09.js.map