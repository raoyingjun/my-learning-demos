// enum枚举类型
export {} // 使用export表示这是个模块。以防止命名冲突。


// 枚举将会影响目标代码
enum PostStatus {
    Draft, // 默认从0开始递增
    Unpublished= 4, // 指定的数值初始值，后面的会逐渐递增
    Published, // 从4递增
    Deleted = 'Deleted' // 指定固定的字符串值
}
/**
 * 如果使用const关键字，则将不会影响目标代码
 * 例如：const enum PostStatus，生成的代码将不会被影响
 */


const post = {
    title: 'My Title',
    content: 'Main Content',
    status: PostStatus.Published
}
