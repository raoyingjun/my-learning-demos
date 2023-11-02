import * as THREE from 'three';
import {point} from "./model";
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();
// 设置物体在场景中的位置
point.position.set(0, 0, 0)
// 把点模型添加到场景
scene.add(point)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(100)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
console.log(scene)

const pointLight = new THREE.PointLight(0xffffff, 100000)
pointLight.position.set(200, 200, 200)
scene.add(pointLight)

export {scene}