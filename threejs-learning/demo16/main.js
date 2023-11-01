import * as THREE from 'three'
import {scene} from "./scene";
import {camera} from "./camera";
import {OrbitControls} from "three/addons";

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
/**
 * object：这里传入相机，通过调整相机来进行控制
 * domElement： 要监控的对象，一般是 Canvas 画布、
 * 轨道控制操作包括改变旋转、缩放、平移
 */
const controls = new OrbitControls(camera, renderer.domElement)
// 设置相机控制器的位置
controls.target.set(200, 200, 200)
// 设置后需要更新位置
controls.update()
// 监听是否发生了控制操作，如果发生了控制操作
controls.addEventListener('change', () => {
    console.log(camera.position)
    // 重新渲染新的结果并呈现到页面
    renderer.render(scene, camera)
})

// 指定场景和相机进行渲染
renderer.render(scene, camera)
// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)

const resize = () => {
    const [w, h, r] = [window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight]
    console.log(w, h, r)
    // 重设渲染尺寸
    renderer.setSize(w, h)
    // 调整相机尺寸
    camera.aspect = r;
    // 调整相机尺寸后，通知相机更新投影矩阵
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
}
resize()
window.onresize = resize

