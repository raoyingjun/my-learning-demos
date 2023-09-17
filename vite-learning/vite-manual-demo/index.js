/**
 * 相比较 Webpack，Vite 更快，更好！理由如下：
 * Vite 无需像 Webpack 需要冷启动再抓取并构建整个应用程序，在浏览器请求时按需引入并进行转换
 * Vite 仅在打包时进行构建，在开发时使用浏览器原生支持的 ESM，因此加载速度快得多！相比较下 Webpack 则需要先进行转换
 * Vite 通过 esbuild 进行预构建，而使用 Go 编写的 esbuild 比使用 javascript 快 10-100倍！
 * Vite 通过 HTTP 头协商缓存，后续不再需要再次请求！
 * 在 esbuild 依赖预构建阶段，做了两件事：
 * 一，将 CommonJS 和 UMD 形式的依赖项，转换为 ESM 模块
 * 二，将包含许多内部模块的的 ESM 依赖转换为单个模块，减少了很多请求量。
 *     缓解了由于大量请求造成的网络拥堵和页面加载缓慢，以此提高页面加载性能。
 */
// 在 Vite 下使用原生 ESM 导入
import person from './person'
// 使用 Vite 支持在 JS 中直接使用 CSS、SaSS、Typescript 等常见类型文件，只需安装相应库，无需额外配置，即可获得开箱即用的体验。
import './index.css' // Vite 默认支持在 JS 中直接使用 CSS
import printByTs from './index.ts' // Vite 默认支持在 TypeScript 中直接使用 CSS
/**
 * 你只需安装 Sass, 即可在 JS 中直接使用 Sass。
 * 如何安装 Sass？npm install -D sass
 */
import './index.scss'

person.introduce()

person.insertInfoToHtml()

console.log(printByTs('Show message with time'));