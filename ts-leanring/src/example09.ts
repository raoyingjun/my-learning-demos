// 隐式类型推断
export {} // 使用export表示这是个模块。以防止命名冲突。

// 类型被自动推断为number
let age = 18

// age = '18' // 这里会报错，因为赋值的类型为string，而推断的类型为number


// 被推断为any。可以设置任何类型的值
let foo;
foo = 100
foo = '100'
foo = {}
