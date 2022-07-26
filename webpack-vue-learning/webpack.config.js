const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")

const path = require('path')

console.log(process.env.NODE_ENV)

module.exports = {
    // webpack 5.X 版本的BUG。必须配置目标环境解该问题。
    target: process.env.NODE_ENV !== 'production' ? 'web' : 'browserslist',
    entry: {
        app: path.join(__dirname, 'src', 'main.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        clean: true
    },
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: {
                                        version: '3.11',
                                        proposals: true
                                    }
                                }
                            ]
                        ],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg||jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192, // 8kb
                        outputPath: 'img',
                        name: '[name].[hash].[ext]'
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '...'],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'public'),
                    to: path.join(__dirname, 'dist'),
                    globOptions: {
                        /**
                         * 参阅：https://github.com/sindresorhus/globby#options
                         * * 匹配任意数量的字符，但不匹配/
                         * ** 匹配任意数量的字符，包括/，只要它是路径部分中的唯一内容
                         */
                        ignore: ['**/*index.html']
                    }
                },
            ]
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
        splitChunks: {
            chunks: 'all'
        }
    }
}
