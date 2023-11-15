import * as THREE from 'three'
import {model} from "./model";
import {directionalLightHelper} from "../race-game/models/light";
import {CameraHelper} from "three";
import {camera} from "./camera";
import {GUI} from "three/addons/libs/lil-gui.module.min";
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();


// 把网格模型添加到场景
scene.add(model)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(100)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
/**
 * 环境光（AmbientLight）：会发散到物体的每个方位。类似白天，人每个地方都会被照到，
 * 点光源（PointLight）：光纤像太阳一样发散
 * 平行光源（DirectionalLight）：只朝着某个方位发散
 * 聚光灯光源（SpotLight）：光线像手电筒一样发散
 * color：光源颜色
 * intensity：光照强度
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)

// 设置环境光的照射位置
directionalLight.position.set(200, 200, 200)

// 开启光源的投射阴影
directionalLight.castShadow = true

// 光源阴影相机的能见度（根据 near 和 far 决定所能看见的范围）
directionalLight.shadow.camera.near = .5
directionalLight.shadow.camera.far = 500

// 光源阴影相机所围成矩形的大小，只能在光源阴影圈定的矩形范围内，投影才会显示
directionalLight.shadow.camera.left = -50
directionalLight.shadow.camera.right = 50
directionalLight.shadow.camera.top = 200
directionalLight.shadow.camera.bottom = -100

// 光源投射阴影的模糊半径
directionalLight.shadow.radius = 50

// 使用多少像素渲染光源所投射阴影的尺寸
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
// 与上面两句代码等价
// directionalLight.shadow.mapSize.set(2048,2048)

// 使用光源辅助器帮助调试
const DirectionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 20, 0xffff00)

// 使用相机辅助器帮助调试
const cameraHelper = new CameraHelper(directionalLight.shadow.camera)

const gui = new GUI()

gui.add(directionalLight.shadow.camera, 'near', 0, 10)
gui.add(directionalLight.shadow.camera, 'far', 0, 1000)

gui.add(directionalLight.shadow.camera, 'left', -100, 100)
gui.add(directionalLight.shadow.camera, 'right', -100, 100)
gui.add(directionalLight.shadow.camera, 'top', -100, 100)
gui.add(directionalLight.shadow.camera, 'bottom', -100, 100)

gui.add(directionalLight.shadow, 'radius', -100, 100)

gui.add(directionalLight.shadow.mapSize, 'width', 0, 4096)
gui.add(directionalLight.shadow.mapSize, 'height', 0, 4096)

// 当值改变了，更新相机视图
gui.onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
    cameraHelper.update()
})

scene.add(ambientLight, directionalLight, DirectionalLightHelper, cameraHelper)
export {scene}