// declare声明
export {} // 使用export表示这是个模块。以防止命名冲突。
/**
 * 使用declare类型声明来兼容不支持ts的模块，使其具有ts的特性。
 * 例如存在以下js方法
 * function print(msg) {
 *     console.log(msg)
 * }
 * 则可以使用declare使其具有强类型的体验
 */


declare function print(msg: string): string

console.log(print('hello'))
