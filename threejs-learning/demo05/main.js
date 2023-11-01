import * as THREE from 'three'
import {scene} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 设施渲结果尺寸
renderer.setSize(WIDTH, HEIGHT)
// 指定场景和相机进行渲染
renderer.render(scene, camera)
// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)