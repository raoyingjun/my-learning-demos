// function函数类型 函数表达式
export {} // 使用export表示这是个模块。以防止命名冲突。

// 使用函数表达式
const intro1 = function(name: string, age: number): string {
    return `I am ${name}, ${age} years old.`
}

/**
 * 使用一个函数表达式，并声明其约束。
 * 用来约束函数可以接受什么样的参数，以及应该返回一个什么类型的值
 */

const intro2: (name: string, age: number) => string = (name: string, age: number) => {
    return `I am ${name}, ${age} years old.`
}
