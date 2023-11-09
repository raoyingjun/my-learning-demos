import * as THREE from 'three'
import {model} from "./model";
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
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)
export {scene}