import * as THREE from 'three'
import {scene} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true, // 是否抗锯齿（可提高渲染表现）

    /**
     * 保留绘图缓存。直到缓存被手动清除或者被覆盖
     * 注意：
     * 一，保留绘图缓存，这可能会占用大量的内存。
     * 二，在默认情况下，WebGL 会在每次渲染后自动清除其绘图缓冲，因此如果想要获取渲染结果。
     * 必须设置为 true。比如当你需要下载 Canvas 画布中 WebGL 绘图的内容。
     */
    preserveDrawingBuffer: true,
})
// 设置渲染器的像素比与设备一致（可提高渲染表现）
renderer.setPixelRatio(window.devicePixelRatio)
// 设置渲染的背景颜色及透明度
renderer.setClearColor(0x00ff00, .4)
// 设施渲结果尺寸
renderer.setSize(WIDTH, HEIGHT)
// 指定场景和相机进行渲染
renderer.render(scene, camera)
// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)