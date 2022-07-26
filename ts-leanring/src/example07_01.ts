// function函数类型 函数声明
export {} // 使用export表示这是个模块。以防止命名冲突。

function toStringSum (a: number, b: number): string {
    return (a + b).toString()
}

toStringSum(100, 200)

// 可选参数。
function say1(name: string, addr?: string): void {
    addr = addr ? `，from ${addr}.` : '.'
    console.log(`Hello, I am ${name}${addr}`)
}
say1('Rose', 'ShenZhen')
say1('Jack')

// 参数默认值。使用参数默认值，则该参数同时也会变成可选参数
function say2(name: string, addr: string = 'BeiJing'): void {
    addr = addr ? `，from ${addr}.` : '.'
    console.log(`Hello, I am ${name}${addr}`)
}
say2('Rose', 'ShenZhen')
say2('Jack')
