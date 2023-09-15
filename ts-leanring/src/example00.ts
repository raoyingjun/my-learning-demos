// 快速入门
export { } // 使用export表示这是个模块。以防止命名冲突。
const hello = (name: string) => {
    /**
     * 添加“dom"在lib字段中以支持console等DOM特性
     */
    console.log(`Hello, ${name}`)
}
