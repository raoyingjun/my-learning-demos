// interface接口
export {} // 使用export表示这是个模块。以防止命名冲突。

interface Post {
    title: string
    content: string
    postTimestamp?: number // 可选属性
    readonly pid: number // 只读属性
}

const post: Post = {
    title: 'My Title',
    content: 'My Content',
    pid: 3
}
// post.pid = 4 // 这里会报错。因为pid是只读属性

// 对于动态成员。也就是不确定有哪些键值
interface Cache {
    /**
     * prop代表属性名称。实际上采用其他任何值都行。例如attr, key等
     * 第一个string表示属性名称的类型。该例子指定必须为string类型的的属性名称
     * 第二个string表示属性值的类型。该例子指定必须为string类型的属性值
     */
    [prop: string]: string
}

const cache: Cache = {}
cache.session = 'SessionID'
// cache.lastAccessTime = Date.now() // 这里会报错。因为lastAccessTime必须为string类型的值，而Date.now()返回的是number类型的值
