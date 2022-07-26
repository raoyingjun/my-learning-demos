// 类型断言assert
export {} // 使用export表示这是个模块。以防止命名冲突。

const nums = [7, 9, 5, 3]
// 断言一定会返回number类型的值
const result = nums.find(num => num > 7) as number
const sqrt = result * result
