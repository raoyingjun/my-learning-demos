import * as THREE from 'three'
import {mesh, scene} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
import {GUI} from "three/addons/libs/lil-gui.module.min";
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
const rotateConfig = {rotate: true}
// 当 add 的值为 Boolean 类型，则会生成选择框
new GUI().add(rotateConfig, 'rotate').name('旋转')
const spin = () => {
    if (rotateConfig.rotate) {
        mesh.rotateY(.01)
    }
    renderer.render(scene, camera)
    requestAnimationFrame(spin)
}
spin()