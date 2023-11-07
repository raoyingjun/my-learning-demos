import * as THREE from 'three'
import {scene} from "./scene";
import {camera, WIDTH, HEIGHT} from "./camera";
import {EffectComposer, OrbitControls, OutlineEffect, OutlinePass, OutputPass, RenderPass} from "three/addons";
import {mesh1} from "./model";
// 创建渲染器
const renderer = new THREE.WebGLRenderer()

/**
 * 创建后处理程序对象
 * 通过后处理可以为 WebGL 增添后期特效。
 * 比如外发光、描边等。
 * renderer：传入 Renderer 对象，这是必须的，
 * 后处理要使用 Renderer 对渲染结果进行后期处理
 */
const effectComposer = new EffectComposer(renderer)
// 渲染通道。指定 EffectComposer 使用的场景和相机
const renderPass = new RenderPass(scene, camera)
/**
 * 描边通道。参数格式规范如下；
 * resolution, 一个 Vector2 对象，向量的 x、y 轴值和需和 Canvas 画布尺寸一致
 * scene, 传入场景
 * camera, 传入相机
 */
const outlinePass = new OutlinePass(new THREE.Vector2(WIDTH, HEIGHT), scene, camera)
// 选择添加外发光效果的模型对象
outlinePass.selectedObjects = [mesh1]
// 把渲染通道、描边通道添加到后处理程序
effectComposer.addPass(renderPass)
effectComposer.addPass(outlinePass)

/**
 * object：这里传入相机，通过调整相机来进行控制
 * domElement： 要监控的对象，一般是 Canvas 画布、
 * 轨道控制操作包括改变旋转、缩放、平移
 */
const controls = new OrbitControls(camera, renderer.domElement)
// 监听是否发生了控制操作，如果发生了控制操作
controls.addEventListener('change', () => {
    console.log(camera.position)
    // 使用后处理进行渲染代替 WebGL Renderer
    effectComposer.render()
})
// 设施渲结果尺寸
renderer.setSize(WIDTH, HEIGHT)
// 使用后处理进行渲染代替 WebGL Renderer
effectComposer.render()


// 获取渲染的结果
const result = renderer.domElement
// 将渲染结果呈现到页面
document.body.appendChild(result)


