const path = require('path');
// 引入 html-webpack-plugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack 配置文件，通过个性化配置项，精细控制 webpack 的行为
module.exports = {
    mode: "production", // 模式， development 或 production
    // 入口，指定 webpack 打包的入口路径
    // entry: './src/index.js', // 单个入口文件
    entry: ['./src/index.js', './src/main.js'], // 多个入口文件，打包后成一个文件
    // 多个入口文件，以对象名作为文件名打包生成相应文件
    // entry: {
    //     foo: './src/index.js', // ./src/index.js -> foo.js
    //     bar: './src/main.js' // ./src/main.js -> main.js
    // },
    // 出口，配置打包后文件的输出路径
    output: {
        filename: 'bundle.js', // 打包后生成的文件名
        // filename: '[name]-[id]-[hash].js', // 同时指定额外元数据
        /**
         * 举例部分：
         * [name]: 打包生成的文件名，与 entry 为对象写法时的对象名关联
         * [id]: 随机生产的唯一 UUID
         * [hash]: 随机生产的唯一 Hash 值
         * 示例：
         * 设有 entry: {foo: 'your/path/foo.js', ...}，打包生成文件名如下
         * [name].js -> foo.js
         * [name]-[id].js -> foo-548.js
         * [name]-[id]-[hash].js -> foo-548-9351fb27ece6ffc5868f.js
         * 
         */
        clean: true, // 每次打包前先清空打包目录
        path: path.resolve(__dirname, 'dest') // 指定打包生产文件的存放目录，默认为 dist，必须是绝对路径
    },

    module: {
        rules: [
            /**
            * 通过配置 Loader，使 Webpack 支持对更多类型文件的处理！
            * 例如 CSS 文件、Typescript 文件、图片资源、浏览器新特性/语法/API·支持等
            * 如何使用 loader？所需 loader -> 安装 -> 配置 -> 即可使用！
            */

            // npm install style-loader css-loader -D
            {
                // 匹配 .css 作为后缀的文件，用 css-loader 和 style-loader 进行处理
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 关于图片资源的处理不需要安装任何 loader，因为使用率极高，被 webpack（version > 5）作为内置 loader。 
            {
                // 匹配相应后缀的图片，通过指定 type: 'asset/resource' 处理
                test: /\.(gif|jpe?g|png|webp)$/,
                type: 'asset/resource'
            },
            // npm install babel-loader @babel/core @babel/preset-env -D
            {
                test: /\.js$/,
                exclude: /node_modules/, // exclude 排除项。排除指定文件或目录，不使用 loader 进行处理
                use: {
                    loader: 'babel-loader',
                    // 传入可选参数
                    options: {
                        // presets 指定要使用的预设配置
                        // @babel/preset-env 包含大多数 JS 新特性的一个预设配置
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    // 插件，一般用于拓展 webpack 的功能。Plugin 所能做的事情比 Loader 范围更广，
    // 包括压缩代码文件、清除文件目录、注入变量、复制文件等
    // 如何使用 plugin？所需 plugin -> 安装 -> 配置 -> 即可使用！
    plugins: [
        // 为插件传入配置项
        new HtmlWebpackPlugin({
            // title: 'Document title' // 设置文档标题
            template: './index.template.html' // 以指定模版创建 HTML 文件
        })
    ],
    // 通过 devtool 配置 sourceMap 类型，便于调试源码。 sourceMap：源码映射、devtool：开发工具
    // devtool: 'inline-source-map'
}
