// keyof
export { } // 使用export表示这是个模块。以防止命名冲突。

type Point = { x: number; y: number };
// keyof 从 Point 取出出所有 key，即 'x' | 'y' 
type P = keyof Point; // P = 'x' | 'y'
const p: P = 'y'
const p2: P = 'x'
// const p3: P = 'z' /** 报错。'z' 不在类型 P 内 */
