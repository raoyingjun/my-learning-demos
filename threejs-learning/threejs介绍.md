# threejs

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


    