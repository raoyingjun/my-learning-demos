import { addCounter } from './counter.js'

addCounter()
// 通过 legacy 插件，箭头函数将转换为普通函数
document.onclick = () => {
  addCounter()
}
