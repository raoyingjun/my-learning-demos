"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 枚举将会影响目标代码
var PostStatus;
(function (PostStatus) {
    PostStatus[PostStatus["Draft"] = 0] = "Draft";
    PostStatus[PostStatus["Unpublished"] = 4] = "Unpublished";
    PostStatus[PostStatus["Published"] = 5] = "Published";
    PostStatus["Deleted"] = "Deleted"; // 指定固定的字符串值
})(PostStatus || (PostStatus = {}));
/**
 * 如果使用const关键字，则将不会影响目标代码
 * 例如：const enum PostStatus，生成的代码将不会被影响
 */
var post = {
    title: 'My Title',
    content: 'Main Content',
    status: PostStatus.Published
};
//# sourceMappingURL=example06.js.map