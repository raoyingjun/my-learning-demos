// typeof
export { } // 使用export表示这是个模块。以防止命名冲突。

let n = 'hello'
type StrType = typeof n // typeof n => string
let t: StrType = 'he'
// let z: StrType = 1 // 报错。 必须是 string 类型。

let o = { a: 123, b: 'hello' }
type ObjType = typeof o
let o1: ObjType = {a: 1, b: 's'} // ObjType => {a: number; b: string;}
// let o2: ObjType = {a: 's', b: 's'} // 报错。o1.a 必须为 ObjType.a 指定的 number 类型而非 string 类型

// 使用 typoef 的变量不可使用 const 声明，报错，原因未知。

