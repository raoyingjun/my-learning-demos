"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// T为泛型参数。创建T类型的参数类型
function createArray(length, defaultValue) {
    return Array(length).fill(defaultValue);
}
// 创建number类型的对象
createArray(10, 99);
createArray(10, 'hello');
// createArray<number>(10, true) // 这里会报错。因为泛型的类型为number，而传入的类型为boolean
//# sourceMappingURL=example15.js.map