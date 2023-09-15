// reflect 映射类型
export { } // 使用export表示这是个模块。以防止命名冲突。

type AnyKeysTye = {
    // [key: string] 表示，随便 key 是什么，但必须是 string 类型。
    // 键值必须是 number | string
    [key: string]: number | string;
};
// 示例
const data: AnyKeysTye = {
    del: 1, // key 为 string 类型，为什么？看，data['del']，'del' 是 string 类型。
    rodney: 'a', // 同上类推。
};

// 通过keyof 迭代键创建类型
type Options<T> = {
    // keyof T 迭代 T 中的 keys，再通过 prop in keys，将 keys 中所有 prop 定义为 boolean 类型
  [prop in keyof T]: boolean;
};

type Features = {
  darkMode: () => void; // prop：darkMode
  newUserProfile: () => void; // prop：newUserProfile
};
 
/**
 * 即 type ForeachKeyType = {
    darkMode: boolean;
    newUserProfile: boolean;
}
 */
// 迭代Features中所有键，创建键值类型为 boolean 的类型
type ForeachKeyType = Options<Features>