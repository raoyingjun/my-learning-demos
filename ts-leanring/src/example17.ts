// namespace命名空间
export {} // 使用export表示这是个模块。以防止命名冲突。

// 仅使用export关键字修饰的将会暴露给外界
namespace HttpUtil {
    // 暴露的属性
    export const TIMEOUT: number = 60 * 1000
    // 不暴露该属性
    const BASE_URL: string = 'https://www.example.com'
    // 暴露的方法
    export const sendGet = (): void => {
        console.log('Requesting by get method')
    }
    // 不暴露该方法
    const cancelRequest = (): void => {
        console.log('Cancelled request')
    }
}

console.log(HttpUtil.TIMEOUT)
// console.log(HttpUtil.BASE_URL) // 这里会报错。由于没有暴露该属性，因此不能访问到该属性
console.log(HttpUtil.sendGet)
// console.log(HttpUtil.cancelRequest)// 这里会报错。由于没有暴露该方法，因此不能访问到该方法
