# Webpack 配置补充

### Webpack DevServer

通过 Webpack DevServer 来提供本地开发服务器支持，并带有 HMR 热重载。

安装 Webpack DevServer

```ps
npm install webpack-dev-server -D
```

使用 Webpack DevServer

```ps
npx webpack serve
```

通过在 package.json 中进行配置以脚本方式执行

```json
// package.json
{
    "scripts": {
        "serve": "npx webpack serve"
    },
}


