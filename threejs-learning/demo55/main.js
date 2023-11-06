import * as THREE from 'three'
import {scene} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
import {OrbitControls} from "three/addons";

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 解决加载 gltf 色差问题，
// 在新版本 Threejs 中默认值已经是 SRGBColorSpace，
// 无需再进行设置
renderer.outputColorSpace = THREE.SRGBColorSpace // 新版本语法。
// renderer.outputEncoding = THREE.sRGBEncoding // 旧版本语法。
// 设施渲结果尺寸
renderer.setSize(WIDTH, HEIGHT)
// 指定场景和相机进行渲染
renderer.render(scene, camera)
// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)

/**
 * object：这里传入相机，通过调整相机来进行控制
 * domElement： 要监控的对象，一般是 Canvas 画布、
 * 轨道控制操作包括改变旋转、缩放、平移
 */
const controls = new OrbitControls(camera, renderer.domElement)
// 一般和 Camera.lookAt 参数保持一致
controls.target.set(-19, -6, -39)
// 语法规定。设置 target 位置后，必须调用 update() 进行更新
controls.update()
// 监听是否发生了控制操作，如果发生了控制操作
controls.addEventListener('change', () => {
    // 重新渲染新的结果并呈现到页面
    renderer.render(scene, camera)
})
const spin = () => {
    console.log(camera.position)
    console.log(controls.target)
    renderer.render(scene, camera)
    requestAnimationFrame(spin)
}
spin()