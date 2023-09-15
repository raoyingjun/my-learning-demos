// 通过index 获取类型
export { } // 使用export表示这是个模块。以防止命名冲突。

type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // Person["age"] => number
type name = Person["age"]; // Person["age"] => number