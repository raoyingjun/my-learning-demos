import $ from "jquery" // 默认 jQuery 也会被打包，可以通过配置 webpack 解决该问题

function prependTitle() {
    if (typeof $ !== 'undefined') {
        $('body').prepend('<h2>The title is prepended to body</h2>');
    }
}

function appendImg(src) {
    if (typeof $ !== 'undefined') {
        $('body').append(`<img src="${src}" />`);
    }
}
export { prependTitle, appendImg }
