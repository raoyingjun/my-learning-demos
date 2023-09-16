# 通过命令行参数完成 sass 的基础配置

### 编译单个文件

sass input.scss output.css

### 监听单个文件

sass --watch input.scss:output.css

### 直接监听文件目录

```txt
示例应用结构如下：
--app
  --src
    --sass // sass 文件存放目录
  --dist
    --styles // 经 sass 编译后的 css 文件存放位置
```

通过如下命令完成监听

```ps
sass --watch src/sass:dist/styles
```

### 编译后的 css 文件排版格式

```ps
sass style.scss:style.css --style [compression method]
sass style.scss:style.css --style expanded
sass style.scss:style.css --style compressed

```

各参数值含义如下表，依据文件的压缩程度降序（从宽松到紧凑）。

| compression method | meaning   |
| ------------------ | ------ |
| expanded           | 展开的 |
| nested             | 嵌套的 |
| compact            | 紧凑的 |
| compressed         | 压缩的 |

其中 expanded 推荐在开发环境，便于阅读； compressed 推荐在生产环境下，减小文件体积。