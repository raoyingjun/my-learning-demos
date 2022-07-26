// 泛型
export {} // 使用export表示这是个模块。以防止命名冲突。
// T为泛型参数。创建T类型的参数类型
function createArray<T>(length: number, defaultValue: T): T[] {
    return Array<T>(length).fill(defaultValue)
}
// 创建number类型的对象
createArray<number>(10, 99)
createArray<string>(10, 'hello')
// createArray<number>(10, true) // 这里会报错。因为泛型的类型为number，而传入的类型为boolean
