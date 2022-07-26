// 原始类型

const a: string = 'foo'
const b: number = 10
const c: boolean = true
// const d: string = undefined // 严格模式下 null、undefined 不能赋值给string
const e: void = undefined
const f: null = null
/**
 * 在tsconfig文件lib字段中添加"es2015"以支持Symbol等es2015的新特性
 */
const h: symbol = Symbol()
