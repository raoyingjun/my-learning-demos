import * as THREE from 'three'
import {scene} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true // 是否抗锯齿（可提高渲染表现）
})
// 设置渲染器的像素比与设备一致（可提高渲染表现）
renderer.setPixelRatio(window.devicePixelRatio)
// 设置渲染的背景颜色及透明度
// renderer.setClearColor(0x00ff00, .4)
// 设施渲结果尺寸
renderer.setSize(WIDTH, HEIGHT)
// 指定场景和相机进行渲染
renderer.render(scene, camera)
// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)
const spin = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(spin)
}
spin()