# Vite 介绍

### 使用 Vite 的优势

* 相比较 Webpack，Vite 更快，更好！理由如下：

* Vite 无需像 Webpack 需要冷启动再抓取并构建整个应用程序，在浏览器
  请求时按需引入并进行转换

* Vite 仅在打包时进行构建，在开发时使用浏览器原生支持的 ESM，因此加
  载速度快得多！相比较下 Webpack 则需要先进行转换

* Vite 通过 esbuild 进行预构建，而使用 Go 编写的 esbuild 比使用
  JavaScript 快 10-100 倍！

* Vite 通过 HTTP 头协商缓存，后续不再需要再次请求！

### 关于 esbuild 依赖预构建

在 esbuild 依赖预构建阶段，做了两件事：
  
* 一，将 CommonJS 和 UMD 形式的依赖项，转换为 ESM 模块

* 二，将包含许多内部模块的的 ESM 依赖转换为单个模块，减少了很多请
  求量。缓解了由于大量请求造成的网络拥堵和页面加载缓慢，以此提高页面加载性能。

### vite 部分命令
```ps
> vite preview // 启用本地服务器进行预览
> vite build // 打包构建应用程序
> vite // 启用本地开发服务器
```

