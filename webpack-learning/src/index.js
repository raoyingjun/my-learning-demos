import calc from './calc'; // 依托于 webpack，可以省略 .js 后缀、使用 ESM 模块化等
import print from './print'; // 同上。
import { prependTitle, appendImg } from './useJquery';
import format from './format';
import './style.css' // 通过配置 webpack 的 Loader，可以使得在 JS 中直接引入 CSS 类型文件等！
import birdImg from './bird.jpg' // 通过配置 webpack 的 Loader，可以使得在 JS 中直接引入图片类型文件等！
console.log('hello world!');

calc.sum(2, 5);
print.printWord('Some words.');

prependTitle()

console.log(print.target) // print.target 使用了，被打包
// console.log(print.mode) print.mode 虽然是未使用的变量，但依旧会被打包

// format 作为模块被导入，但未使用其中的属性或者方法，则该模块将不会被打包。
// format.formatDate(); // 未使用，模块 format 不被打包
// console.log(format.method); // 未使用，模块 format 不被打包

appendImg(birdImg)

// Webpack 会在打包过程中对代码自动优化
const a = 'hello'
console.log(a); // 优化后为 console.log('hello')。打包生成后变量 a 经优化后移除了。
function sayHello() {
    return "hello"
}
console.log(sayHello()); // 优化后为 console.log('hello')。打包生成后函数 sayHello 经优化后移除了。

/**
 * 下列 onClick 事件经 Babel 转换后的结果如下：
 * document.body.onclick = function() {
 *     console.log("Body is clicked.")
 * }
 */
document.body.onclick = () => {
    console.log('Body is clicked.');
}