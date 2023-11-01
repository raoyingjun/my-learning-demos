import * as THREE from 'three'
import {scene, mesh} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
import {OrbitControls} from "three/addons";
// 创建渲染器
const renderer = new THREE.WebGLRenderer()
/**
 * object：这里传入相机，通过调整相机来进行控制
 * domElement： 要监控的对象，一般是 Canvas 画布、
 * 轨道控制操作包括改变旋转、缩放、平移
 */
const controls = new OrbitControls(camera, renderer.domElement)
// 监听是否发生了控制操作，如果发生了控制操作
controls.addEventListener('change', () => {
    console.log(camera.position)
    // 重新渲染新的结果并呈现到页面
    renderer.render(scene, camera)
})
// 设施渲结果尺寸
renderer.setSize(WIDTH, HEIGHT)
// 指定场景和相机进行渲染
renderer.render(scene, camera)
// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)

// 创建一个时钟，可用其生成一些渲染数据等
const clock = new THREE.Clock()
const spin = () => {
    // 每次渲染的间隔时间（单位秒）
    const split = clock.getDelta()
    // 秒->毫秒
    console.log('渲染间隔', split * 1000)
    // 每秒可渲染多次次，即帧率
    console.log('渲染帧率', 1000 / split * 1000)
    mesh.rotateY(0.01)
    renderer.render(scene, camera)
    requestAnimationFrame(spin)
}
spin()

