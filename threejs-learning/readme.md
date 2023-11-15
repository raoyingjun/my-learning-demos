# threejs

## usage
引入项目后，在项目根目录下：
```
npm install
npx vite
```

**访问 Demo 示例：**
```
http://location:5173/<DirName>/index.html
```
DirName：项目下对应 Demo 的文件夹名称，比如：
```
http://location:5173/demo01/index.html
```

**访问 Race Game 赛车游戏：**
```
http://localhost:5173/race-game/index.html
```

> 注意，vite 本地服务器端口以 cmd 实际显示为准，一般是 5173 端口

### webgl

是用来做 3d 效果的，在 js 中如何使用 webgl ：

```javascript
// 假设存在 canvas 对象
const gl = canvas.getContext('webgl')
```

### threejs

##### 介绍

用来做 webgl 的框架，封装和抽象化了底层细节。易于开发实现 3D 效果

##### 概念
threejs 使用 Scene（场景）和 Camera（相机），
然后经 WebGLRenderer 渲染器处理后，投影（渲染）到页面上。
```


    