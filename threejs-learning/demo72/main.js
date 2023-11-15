import * as THREE from 'three'
import {scene} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
import {OrbitControls} from "three/addons";

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 启用投影效果
renderer.shadowMap.enabled = true

/**
 * object：这里传入相机，通过调整相机来进行控制
 * domElement： 要监控的对象，一般是 Canvas 画布、
 * 轨道控制操作包括改变旋转、缩放、平移
 */
const controls = new OrbitControls(camera, renderer.domElement)
// 监听是否发生了控制操作，如果发生了控制操作
controls.addEventListener('change', () => {
    renderer.render(scene, camera)
})
// 设施渲结果尺寸
renderer.setSize(WIDTH, HEIGHT)

;(function render(){
    renderer.render(scene, camera)
    requestAnimationFrame(render)
})()



// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)


